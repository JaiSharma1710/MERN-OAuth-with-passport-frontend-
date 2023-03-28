export const UseGlobalLogic = () => {
  const signInGoogle = async () => {
    try {
      window.open('http://localhost:7000/auth/google/', '_self');
    } catch (err) {
      console.log(err);
    }
  };

  return {
    signInGoogle,
  };
};
