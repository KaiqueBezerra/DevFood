## Get started

1. Install dependencies

   ```bash
   npm install
   ```

3. Set `baseURL` to your local machine's IP:

   In the `src/services/api/api.ts` file, replace the value of `baseURL` with the local IP of your machine running the json server.

   ```ts
   // src/services/api/api.ts
   const api = axios.create({
     baseURL: "http://YOUR_LOCAL_IP:3000/",
   });

2. Start json server

   ```bash
   npx json-server db.json
   ```

3. Start the app

   ```bash
   npx expo start
   ```
