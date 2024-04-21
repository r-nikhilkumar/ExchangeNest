// Function to generate a random number between min and max
export const getRandomNumber = (min, max) => {
    return Math.random() * (max - min) + min;
  };
  
  // Function to generate random prices for a day
  export const generateRandomPrices = () => {
    const open = getRandomNumber(90, 110);
    const high = getRandomNumber(open, open + 20);
    const low = getRandomNumber(open - 20, open);
    const close = getRandomNumber(low, high);
    return { open, high, low, close };
  };
  
  // Array to store the generated data
  const data = [];
  
  // Generate 60 days of data
  for (let i = 0; i < 100; i++) {
    const date = new Date(`2022-01-${i + 1}`);
    const prices = generateRandomPrices();
    data.push({ date, ...prices });
  }
  
  export default data;
  