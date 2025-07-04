## Get started

1. Install dependencies

   ```bash
   npm install
   ```

2. Set `baseURL` to your local machine's IP:

   In the `src/services/api/api.ts` file, replace the value of `baseURL` with the local IP of your machine running the json server.

   ```ts
   // src/services/api/api.ts
   const api = axios.create({
     baseURL: "http://YOUR_LOCAL_IP:3000/",
   });
   ```

3. Start json server

   ```bash
   npx json-server db.json
   ```

4. Start the app

   ```bash
   npx expo start
   ```

## Images

![Imagem do projeto](public/devfood.jpg)
![Imagem do projeto](public/restaurant.jpg)
![Imagem do projeto](public/food.jpg)
![Imagem do projeto](public/cart.jpg)
