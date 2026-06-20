import * as React from 'react';
import { View } from 'react-native';
import WebView from 'react-native-webview';

const TAPPAY_APP_ID = process.env.EXPO_PUBLIC_TAPPAY_APP_ID ?? '';
const TAPPAY_APP_KEY = process.env.EXPO_PUBLIC_TAPPAY_APP_KEY ?? '';
const TAPPAY_ENV = process.env.EXPO_PUBLIC_TAPPAY_SANDBOX === 'false' ? 'production' : 'sandbox';

type TapPayMessage =
  | { type: 'prime'; prime: string }
  | { type: 'error'; message: string };

export type TapPayCardFormHandle = {
  /** Asks TapPay's SDK for a one-time `prime` token for the entered card. */
  submit: () => void;
};

type TapPayCardFormProps = {
  onPrime: (prime: string) => void;
  onError: (message: string) => void;
};

/**
 * Isolated TapPay Direct Pay card-capture component. Card number/expiry/CCV
 * never touch React Native state — TapPay's SDK renders them as secure
 * iframes inside this WebView and only ever hands back an opaque `prime`
 * token, which the backend exchanges for a charge via /api/payments/charge.
 */
export const TapPayCardForm = React.forwardRef<TapPayCardFormHandle, TapPayCardFormProps>(
  function TapPayCardForm({ onPrime, onError }, ref) {
    const webviewRef = React.useRef<WebView>(null);

    React.useImperativeHandle(ref, () => ({
      submit: () => {
        webviewRef.current?.injectJavaScript('window.bmogGetPrime(); true;');
      },
    }));

    const handleMessage = React.useCallback(
      (event: { nativeEvent: { data: string } }) => {
        try {
          const message: TapPayMessage = JSON.parse(event.nativeEvent.data);
          if (message.type === 'prime') {
            onPrime(message.prime);
          } else if (message.type === 'error') {
            onError(message.message);
          }
        } catch {
          onError('Unexpected response from TapPay form.');
        }
      },
      [onPrime, onError]
    );

    return (
      <View style={{ height: 220 }}>
        <WebView
          ref={webviewRef}
          originWhitelist={['*']}
          source={{ html: buildHtml() }}
          onMessage={handleMessage}
          javaScriptEnabled
          scrollEnabled={false}
        />
      </View>
    );
  }
);

function buildHtml() {
  return `
<!DOCTYPE html>
<html>
  <head>
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
    <script src="https://js.tappaysdk.com/sdk/tpdirect/v5.18.0"></script>
    <style>
      body { margin: 0; padding: 0 12px; font-family: -apple-system, sans-serif; }
      .field { height: 46px; border-bottom: 1px solid rgba(30,45,33,0.15); margin-top: 10px; }
      .row { display: flex; gap: 12px; }
      .row .field { flex: 1; }
    </style>
  </head>
  <body>
    <div id="card-number" class="field"></div>
    <div class="row">
      <div id="card-expiration-date" class="field"></div>
      <div id="card-ccv" class="field"></div>
    </div>
    <script>
      TPDirect.setupSDK('${TAPPAY_APP_ID}', '${TAPPAY_APP_KEY}', '${TAPPAY_ENV}');
      TPDirect.card.setup({
        fields: {
          number: { element: '#card-number', placeholder: '**** **** **** ****' },
          expirationDate: { element: '#card-expiration-date', placeholder: 'MM / YY' },
          ccv: { element: '#card-ccv', placeholder: 'CCV' },
        },
        styles: { input: { color: '#1e2d21', 'font-size': '16px' } },
      });

      window.bmogGetPrime = function () {
        TPDirect.card.getPrime(function (result) {
          if (result.status !== 0) {
            window.ReactNativeWebView.postMessage(
              JSON.stringify({ type: 'error', message: result.msg })
            );
            return;
          }
          window.ReactNativeWebView.postMessage(
            JSON.stringify({ type: 'prime', prime: result.card.prime })
          );
        });
      };
    </script>
  </body>
</html>`;
}
