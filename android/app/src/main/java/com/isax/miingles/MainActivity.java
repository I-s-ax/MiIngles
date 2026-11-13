package com.isax.miingles;

import android.Manifest;
import android.app.Activity;
import android.content.Intent;
import android.content.pm.PackageManager;
import android.os.Bundle;
import android.speech.RecognitionListener;
import android.speech.RecognizerIntent;
import android.speech.SpeechRecognizer;
import android.speech.tts.TextToSpeech;
import android.webkit.JavascriptInterface;
import android.webkit.WebResourceRequest;
import android.webkit.WebResourceResponse;
import android.webkit.WebSettings;
import android.webkit.WebView;
import android.webkit.WebViewClient;

import org.json.JSONArray;

import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Locale;

/**
 * Muestra la app web (carpeta www dentro del APK) en un WebView.
 * Los archivos se sirven bajo una dirección https interna para que funcionen
 * los módulos de JavaScript y el guardado del avance. La voz y el micrófono
 * se ofrecen a la página con el objeto AndroidBridge.
 */
public class MainActivity extends Activity {
    private static final String HOST = "appassets.androidplatform.net";
    private static final String START = "https://" + HOST + "/index.html";
    private static final int MIC_REQUEST = 7;

    private WebView web;
    private TextToSpeech tts;
    private volatile boolean ttsReady;
    private SpeechRecognizer recognizer;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        web = new WebView(this);
        web.setBackgroundColor(0xFF0E1020);
        setContentView(web);

        WebSettings settings = web.getSettings();
        settings.setJavaScriptEnabled(true);
        settings.setDomStorageEnabled(true);

        web.addJavascriptInterface(new Bridge(), "AndroidBridge");
        web.setWebViewClient(new WebViewClient() {
            @Override
            public WebResourceResponse shouldInterceptRequest(WebView view, WebResourceRequest request) {
                if (!HOST.equals(request.getUrl().getHost())) {
                    return null; // búsquedas en línea: van a internet
                }
                String path = request.getUrl().getPath();
                if (path == null || path.isEmpty() || path.equals("/")) {
                    path = "/index.html";
                }
                try {
                    return new WebResourceResponse(mimeOf(path), isText(path) ? "utf-8" : null,
                            getAssets().open("www" + path));
                } catch (IOException e) {
                    return new WebResourceResponse("text/plain", "utf-8", 404, "Not Found",
                            new HashMap<String, String>(), new ByteArrayInputStream(new byte[0]));
                }
            }

            @Override
            public boolean shouldOverrideUrlLoading(WebView view, WebResourceRequest request) {
                if (HOST.equals(request.getUrl().getHost())) {
                    return false;
                }
                try {
                    startActivity(new Intent(Intent.ACTION_VIEW, request.getUrl()));
                } catch (Exception ignored) {
                    // no hay navegador instalado
                }
                return true;
            }
        });

        tts = new TextToSpeech(this, status -> {
            if (status == TextToSpeech.SUCCESS) {
                int result = tts.setLanguage(Locale.US);
                ttsReady = result != TextToSpeech.LANG_MISSING_DATA
                        && result != TextToSpeech.LANG_NOT_SUPPORTED;
            }
        });

        web.loadUrl(START);
    }

    private static boolean isText(String path) {
        return !path.endsWith(".png");
    }

    private static String mimeOf(String path) {
        if (path.endsWith(".html")) return "text/html";
        if (path.endsWith(".js")) return "text/javascript";
        if (path.endsWith(".css")) return "text/css";
        if (path.endsWith(".svg")) return "image/svg+xml";
        if (path.endsWith(".png")) return "image/png";
        if (path.endsWith(".json") || path.endsWith(".webmanifest")) return "application/json";
        return "text/plain";
    }

    /** Lo que la página puede pedirle a Android. */
    private class Bridge {
        @JavascriptInterface
        public boolean speak(String text, boolean slow) {
            if (!ttsReady) {
                return false;
            }
            tts.setSpeechRate(slow ? 0.6f : 0.95f);
            tts.speak(text, TextToSpeech.QUEUE_FLUSH, null, "miingles");
            return true;
        }

        @JavascriptInterface
        public void stopSpeaking() {
            if (tts != null) {
                tts.stop();
            }
        }

        @JavascriptInterface
        public void listen() {
            runOnUiThread(() -> {
                if (checkSelfPermission(Manifest.permission.RECORD_AUDIO) == PackageManager.PERMISSION_GRANTED) {
                    startListening();
                } else {
                    requestPermissions(new String[]{Manifest.permission.RECORD_AUDIO}, MIC_REQUEST);
                }
            });
        }
    }

    @Override
    public void onRequestPermissionsResult(int requestCode, String[] permissions, int[] grantResults) {
        super.onRequestPermissionsResult(requestCode, permissions, grantResults);
        if (requestCode != MIC_REQUEST) {
            return;
        }
        if (grantResults.length > 0 && grantResults[0] == PackageManager.PERMISSION_GRANTED) {
            startListening();
        } else {
            heardError("not-allowed");
        }
    }

    private void startListening() {
        if (!SpeechRecognizer.isRecognitionAvailable(this)) {
            heardError("unavailable");
            return;
        }
        if (recognizer == null) {
            recognizer = SpeechRecognizer.createSpeechRecognizer(this);
            recognizer.setRecognitionListener(new RecognitionListener() {
                @Override
                public void onResults(Bundle results) {
                    ArrayList<String> heard = results.getStringArrayList(SpeechRecognizer.RESULTS_RECOGNITION);
                    if (heard == null || heard.isEmpty()) {
                        heardError("no-speech");
                    } else {
                        runJs("window.__heard && window.__heard(" + new JSONArray(heard) + ")");
                    }
                }

                @Override
                public void onError(int error) {
                    switch (error) {
                        case SpeechRecognizer.ERROR_NO_MATCH:
                        case SpeechRecognizer.ERROR_SPEECH_TIMEOUT:
                            heardError("no-speech");
                            break;
                        case SpeechRecognizer.ERROR_NETWORK:
                        case SpeechRecognizer.ERROR_NETWORK_TIMEOUT:
                        case SpeechRecognizer.ERROR_SERVER:
                            heardError("network");
                            break;
                        case SpeechRecognizer.ERROR_INSUFFICIENT_PERMISSIONS:
                            heardError("not-allowed");
                            break;
                        case SpeechRecognizer.ERROR_AUDIO:
                            heardError("audio-capture");
                            break;
                        default:
                            heardError("other");
                    }
                }

                @Override public void onReadyForSpeech(Bundle params) { }
                @Override public void onBeginningOfSpeech() { }
                @Override public void onRmsChanged(float rmsdB) { }
                @Override public void onBufferReceived(byte[] buffer) { }
                @Override public void onEndOfSpeech() { }
                @Override public void onPartialResults(Bundle partialResults) { }
                @Override public void onEvent(int eventType, Bundle params) { }
            });
        }
        Intent intent = new Intent(RecognizerIntent.ACTION_RECOGNIZE_SPEECH);
        intent.putExtra(RecognizerIntent.EXTRA_LANGUAGE_MODEL, RecognizerIntent.LANGUAGE_MODEL_FREE_FORM);
        intent.putExtra(RecognizerIntent.EXTRA_LANGUAGE, "en-US");
        intent.putExtra(RecognizerIntent.EXTRA_MAX_RESULTS, 3);
        recognizer.cancel();
        recognizer.startListening(intent);
    }

    private void heardError(String code) {
        runJs("window.__heardError && window.__heardError('" + code + "')");
    }

    private void runJs(String script) {
        runOnUiThread(() -> web.evaluateJavascript(script, null));
    }

    @Override
    public void onBackPressed() {
        if (web.canGoBack()) {
            web.goBack();
        } else {
            super.onBackPressed();
        }
    }

    @Override
    protected void onDestroy() {
        if (tts != null) {
            tts.shutdown();
        }
        if (recognizer != null) {
            recognizer.destroy();
        }
        web.destroy();
        super.onDestroy();
    }
}
