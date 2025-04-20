export const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };
  
  export const validatePassword = (password: string): boolean => {
    return password.length >= 6;
  };
  
  export const validateName = (name: string): boolean => {
    return name.trim().length >= 2;
  };
  
  export const validateBridgeId = (id: string): boolean => {
    // Format: [State Code][District No]FOB[Serial No]
    // Example: HR16FOB01
    const bridgeIdRegex = /^[A-Z]{2}\d{2}FOB\d{2}$/;
    return bridgeIdRegex.test(id);
  };