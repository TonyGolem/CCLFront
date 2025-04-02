CREATE TABLE producto (
    idProducto SERIAL PRIMARY KEY,
    nombreProducto VARCHAR(100) NOT NULL,
    cantidadProducto INTEGER NOT NULL
);

INSERT INTO producto (nombreProducto, cantidadProducto) VALUES 
('Camara', 90),
('Laptop', 80),
('iPhone 15', 70),
('iPhone 15 PRO MAX', 60)

SELECT * FROM producto