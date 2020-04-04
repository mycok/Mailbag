import { app } from './server';

const PORT = process.env.PORT || 8081;

app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`);
});
