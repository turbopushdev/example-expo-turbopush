import {useIsFocused} from '@react-navigation/native'
import {CameraView, PermissionResponse, useCameraPermissions} from 'expo-camera'
import {useCallback, useEffect, useRef, useState} from 'react'
import {AppState, Platform, StyleSheet, View} from 'react-native'

export type QrCodeScannerRootProps = {
  children: React.ReactNode
  disabledScan?: boolean
  flash?: boolean
  onRequestPermission?: (res: PermissionResponse) => void
  onScan?: (data: string) => void
  resetBarCodeData?: boolean
  testID?: string
}

export const QrCodeScannerRoot = ({
  children,
  disabledScan,
  flash,
  onRequestPermission = () => {},
  onScan,
  resetBarCodeData,
  testID = 'QrCodeScanner',
  ...props
}: QrCodeScannerRootProps) => {
  const [currentCode, setCurrentCode] = useState<string>()
  const qrLock = useRef(false)
  const [appState, setAppState] = useState(AppState.currentState)
  const isAppActive = appState === 'active'
  const isFocused = useIsFocused()
  const [permission, requestPermission] = useCameraPermissions()

  useEffect(() => {
    const subscription = AppState.addEventListener('change', nextAppState => {
      const isGoingToForeground = appState.match(/inactive|background/) && nextAppState === 'active'
      if (isGoingToForeground) {
        qrLock.current = false
      }

      setAppState(nextAppState)
    })

    return () => {
      subscription.remove()
    }
  }, [appState])

  useEffect(() => {
    const initializeCamera = async () => {
      const permission = await requestPermission()
      onRequestPermission(permission)
    }

    initializeCamera()
  }, [onRequestPermission, requestPermission])



  const _onBarcodeScanned = useCallback(
    ({data}: {data?: string}) => {
      if (resetBarCodeData) {
        setCurrentCode(undefined)
      }

      if (data && !disabledScan && (!qrLock.current || data !== currentCode)) {
        qrLock.current = true
        setCurrentCode(data)

        setTimeout(() => {
          onScan?.(data)
        }, 500)
      }
    },
    [currentCode, disabledScan, onScan, resetBarCodeData]
  )

  const shouldShowCamera = permission?.granted && isFocused && isAppActive

  return (
    <View
      style={[Platform.OS === 'android' ? {flex: 1} : StyleSheet.absoluteFillObject, {backgroundColor: 'black'}]}
    >
      {shouldShowCamera && (
        <CameraView
          barcodeScannerSettings={{
            barcodeTypes: ['qr'],
          }}
          enableTorch={flash}
          facing='back'
          onBarcodeScanned={_onBarcodeScanned}
          style={StyleSheet.absoluteFillObject}
        />
      )}
      {children}
    </View>
  )
}
