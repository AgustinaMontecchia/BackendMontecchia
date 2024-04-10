import fs from 'fs';

class ProductManager {
    constructor(filePath) {
        this.filePath = filePath;
        this.products = [];

        if (!fs.existsSync(filePath)) {
            fs.writeFileSync(filePath, '[]');
            console.log("Archivo creado exitosamente.");
        }
    }

    async readProductsFromFile() {
        try {
            const data = await fs.promises.readFile(this.filePath, 'utf-8');
            if (data.trim() !== '') {
                this.products = JSON.parse(data);
            }
        } catch (error) {
            console.error("Error al leer el archivo:", error);
        }
    }

    async saveProductsToFile() {
        try {
            const jsonData = JSON.stringify(this.products, null, 2);
            await fs.promises.writeFile(this.filePath, jsonData, 'utf-8');
            console.log("Productos guardados correctamente en el archivo.");
        } catch (error) {
            console.log("Error al guardar el archivo:", error);
        }
    }

    async initialize() {
        try {
            await this.readProductsFromFile(); 
            
        } catch (error) {
        
            console.error("Error al inicializar ProductManager:", error);
        }
    }

    async deleteProduct(id) {
        const index = this.products.findIndex(product => product.id === id);
        if (index !== -1) {
            this.products.splice(index, 1);
            await this.saveProductsToFile();
            console.log("Producto eliminado correctamente");
            return true;
        }
        console.log("No se encontró ningún producto con el ID proporcionado");
        return false;
    }
    async updateProduct(id, updatedProduct) {
        try {
            const index = this.products.findIndex(product => product.id === id);
            if (index !== -1) {
                this.products[index] = { ...this.products[index], ...updatedProduct };
                await this.saveProductsToFile();
                console.log("Producto actualizado correctamente");
                return true;
            }
            console.log("No se encontró ningún producto con el ID proporcionado");
            return false;
        } catch (error) {
            console.error("Error al actualizar el producto:", error);
            return false;
        }
    }

    addProduct(product) {
        const approved = product.title && product.description && product.price && product.thumbnail && product.code && product.stock;

        if (!approved) return console.log("Porfavor completar todos los campos requeridos");

        const validate = this.products.some((item) => item.code === product.code);

        if (validate) return console.log("Ya existe un producto con este código");

        product.id = this.products.length + 1;
        this.products.push(product);
        console.log("Producto agregado correctamente");
        this.saveProductsToFile();
    }

    getProducts() {
        return this.products;
    }

    getProductById(id) {
        const product = this.products.find((i) => i.id === id);
        return product ? product : (console.log("Producto no encontrado"), null);
    }
}

const manager = new ProductManager('productos.json');

const newProduct = {
    title: "Membrana liquida elastica - Nogopaint",
    description: "Transitable, super elástica, apta todo tipo de superficies",
    price: 50000,
    thumbnail: "https://nogopaint.com.ar/img/prods/memliq.jpg",
    code: "P001",
    stock: 50
};
const newProduct2 = {
    title: "Acrílico exterior - Nogopaint",
    description: "Proteccion acrílica, máximo rendimiento",
    price: 50000,
    thumbnail: "https://www.nogopaint.com.ar/img/prods/acrilext-v3.jpg",
    code: "P002",
    stock: 200
};
const newProduct4 = {
    title: "Acrílico premium",
    description: "Para exterior e interior",
    price: 50000,
    thumbnail: "https://www.nogopaint.com.ar/img/prods/acriprem-v2.jpg",
    code: "P004",
    stock: 100
};
const newProduct3 = {
    title: "Latex obra",
    description: "Para exterior e interior",
    price: 70000,
    thumbnail: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTuHOeBXFKs0LzjV3qGxb5JcAqGGrGOSpYi7FDLqFyxbRxie1Rt5tkmUaYNPkK7Yf0P49E&usqp=CAU",
    code: "P003",
    stock: 70
};

// manager.addProduct(newProduct) //agregar productos 
// manager.addProduct(newProduct2)
// manager.addProduct(newProduct3)
// manager.addProduct(newProduct4)

manager.initialize()  // cuando se inicializa crea el .json
.then(()=> {

    // console.log(manager.getProducts()) // traer todos los objetos dentro del JSON
    // console.log(manager.getProductById(2))  // traer todos los objetos dentro del JSON por el id indicado
    // manager.updateProducto(4,newProduct)
    // manager.deleteProduct(4)   
})