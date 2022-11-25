# Setup

This API uses MySQL as database. If you already have a MySQL instance running you can skip the first step

1. Creating a MySQL locally using docker

```
  docker run --name some-mysql -p 3306:3306 -e MYSQL_ROOT_PASSWORD=password -d mysql:8.0.29
```

2. Install de dependencies

```sh
  npm install
```

3. Create the `.env` file and set the values accordingly

```sh
  cp .env.example .env
```

4. Run database migrations

```sh
  npx prisma migrate dev
```

5. Start the API

```sh
  npm run dev
```

# REFERENCES

- https://medium.com/backticks-tildes/the-s-o-l-i-d-principles-in-pictures-b34ce2f1e898
- https://refactoring.guru/design-patterns/singleton/typescript/example
- https://blog.rocketseat.com.br/path-mapping-typescript/
- https://youtu.be/vAV4Vy4jfkc
- https://youtu.be/6SfrO3D4dHM
