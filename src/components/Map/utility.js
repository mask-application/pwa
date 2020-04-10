export const getCurrentPosition = () => {
  return new Promise((resolve, reject) => {
    if (
      'geolocation' in navigator &&
      navigator.geolocation &&
      typeof navigator.geolocation.getCurrentPosition === 'function'
    ) {
      try {
        navigator.geolocation.getCurrentPosition(
          (position) =>
            resolve({
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            }),
          () => {
            reject({
              message:
                'از طریق \n Settings > Privacy > Location Services > Safari Websites \n دسترسی موقعیت مکانی را فعال کنید.',
            });
          },
          { timeout: 10000 }
        );
      } catch (error) {
        console.log(
          'Error when calling navigator.geolocation.getCurrentPosition: ',
          error
        );
        reject({ message: 'مرورگر شما قابلیت مکان‌یابی را ندارد' });
      }
    } else {
      reject({ message: 'مرورگر شما قابلیت مکان‌یابی را ندارد' });
    }
  });
};
