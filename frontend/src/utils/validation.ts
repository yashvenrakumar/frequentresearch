 
  
  export const validatePassword = (password: string): number => {
    let score = 0;
    if (password.length >= 8) score++;
    if (/\d/.test(password)) score++;
    if (/[!@#$%^&*]/.test(password)) score++;
    return score;
  };
  
  export const validateImageFile = (file: File): boolean => {
    const isValidType = ["image/png", "image/jpeg"].includes(file.type);
    const isValidSize = file.size <= 2 * 1024 * 1024;
    return isValidType && isValidSize;
  };
  