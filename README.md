<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

#Template NestJs with MONGODB

1. Install Dependencies
```
bun install
```
2. Clone the .env.template file and rename it to .env
```
cp .env.template .env
```
3. Change the environment variables
4. Bring up the database
```
docker-compose up -d
```
5. Start the app in development mode:
```
bun start:dev
```
6. Run Seed
```
localhost:3000/api/templateNestJs/seed/
```