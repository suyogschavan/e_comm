# E-Commerce Marketplace API Documentation

Welcome to the API documentation for the E-Commerce Marketplace. This project provides a set of REST API endpoints to facilitate communication between buyers and sellers in an e-commerce ecosystem.
## Demo

## Authentication


https://github.com/suyogschavan/e_comm/assets/83905525/b002d5f2-0886-485e-85d7-db1cf4a65049


To access the APIs, users must authenticate by obtaining an authentication token. Use the following endpoints for authentication:

- **Register a User:**

  - `POST /api/auth/register`
  - Register a user with a unique username, password, and user type (buyer or seller).
- **Login:**

  - `POST /api/auth/login`
  - Log in with a registered username and password to receive an authentication token.

## Buyer APIs

- **Get List of Sellers:**

  - `GET /api/buyer/list-of-sellers`
  - Retrieve a list of all sellers.
- **Get Seller's Catalog:**

  - `GET /api/buyer/seller-catalog/:seller_id`
  - Get the catalog of a specific seller by providing their ID.
- **Create Order:**

  - `POST /api/buyer/create-order/:seller_id`
  - Create an order by specifying the seller's ID and a list of products.

## Seller APIs

- **Create Catalog:**

  - `POST /api/seller/create-catalog`
  - Create a catalog by providing a list of products.
- **Get Seller's Orders:**

  - `GET /api/seller/orders`
  - Retrieve a list of orders received by the seller.

## Entities

### Users

- Two types: buyers and sellers
- Attributes: _id, username, password, type (buyer/seller)

### Catalogs

- Belongs to a seller
- Attributes: _id, seller (reference to User), products (array of Products)

### Products

- Attributes: _id, name, price

### Orders

- Created by a buyer
- Attributes: _id, buyer (reference to User), seller (reference to User), products (array of Products)

## API Endpoints

- See [Authentication](https://github.com/suyogschavan/e_comm/blob/main/routes/auth.js)
- See [Buyer APIs](https://github.com/suyogschavan/e_comm/blob/main/routes/buyers.js)
- See [Seller APIs](https://github.com/suyogschavan/e_comm/blob/main/routes/sellers.js)

## Getting Started

### Prerequisites

- Node.js
- Postman extension or application

### Installation

1. Clone the repository.
   ```bash
   git clone "https://github.com/suyogschavan/e_comm.git"
   ```


2. Install dependencies: `npm install`
3. Start the server: `npm start`

### Configuration

Set up environment variables such as database connection details and secret keys. Refer to the `.env` file.

## Contributing

Feel free to contribute by submitting issues or pull requests.
