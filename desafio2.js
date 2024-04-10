class ProductManager {
    constructor () {
        this.products = [];
        this.id = 1;
    }
    addProduct (product) {
        const exist = this.products.some((p) => p.code === product.code);
        if (product.title && product.description && product.price && product.thumbnail &&
            product.code && product.stock !== ''){
                if (exist) {
                    console.log("El código ya existe");
                } else {
                    product.id = this.id++;
                    this.products.push(product);
                    console.log("Producto agregado con éxito");
                }
        } else {
            console.log("Obligatorio completar todos los campos");
        }
    }
    getProducts() {
        return this.products;
    }
    getProductById(id) {
        const product = this.products.find((p) => p.id === id);
        return product;
    }
}
const productManager = new ProductManager();
productManager.addProduct({
    title: "Producto 1",
    description: "Descripción 1",
    price: 100,
    thumbnail: "ruta/imagen1",
    code: "cod1",
    stock: 10,
});
productManager.addProduct({
    title: "Producto 2",
    description: "Descripción 2",
    price: 200,
    thumbnail: "ruta/imagen2",
    code: "cod2",
    stock: 5,
});
productManager.addProduct({
    title: "Producto 3",
    description: "Descripción 3",
    price: 150,
    thumbnail: "ruta/imagen3",
    code: "cod3",
    stock: 20,
});
productManager.getProducts();
console.log(productManager);
const producto = productManager.getProductById(1);
console.log(producto);