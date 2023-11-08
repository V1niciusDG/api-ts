import app from "../app";

app.listen(process.env.PORT || 3333, () => {
    console.log(`Rest Server listening on port http://${process.env.HOST ?? 'localhost'}:${process.env.PORT}/api-docs`);
  });
