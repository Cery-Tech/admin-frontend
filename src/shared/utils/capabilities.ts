type DeviceCapability = {
  canMakePhoneCall: boolean;
  canSendSMS: boolean;
  isTouchDevice: boolean;
};

export function detectDeviceCapabilities(): DeviceCapability {
  const userAgent = navigator.userAgent.toLowerCase();

  // Create a temporary <a> element for capability checks
  const tempElement = document.createElement('a');

  // Check if the device can make phone calls (telephony)
  const canMakePhoneCall =
    /iphone|android|windows phone|blackberry/.test(userAgent) && 'tel' in tempElement;

  // Check if the device can send SMS
  const canSendSMS = 'sms' in tempElement;

  // Clean up the created element
  tempElement.remove();

  // Check if the device supports touch
  const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

  return {
    canMakePhoneCall,
    canSendSMS,
    isTouchDevice,
  };
}
