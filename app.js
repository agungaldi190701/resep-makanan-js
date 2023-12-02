const fs = require('fs');
const readlineSync = require('readline-sync');

let recipes = [];

function saveRecipes() {
    const data = JSON.stringify(recipes, null, 2);
    fs.writeFileSync('recipes.json', data);
}

function loadRecipes() {
    try {
        const data = fs.readFileSync('recipes.json', 'utf8');
        recipes = JSON.parse(data);
    } catch (err) {
        recipes = [];
    }
}

function addRecipe() {
    console.log('Tambah Resep');
    const recipeName = readlineSync.question('Nama Resep: ');

    console.log('Masukan bahan-bahan (tekan underscore untuk menghentikan penambahan bahan): ');
    let ingredients = [];
    let ingredientNumber = 1;

    while (true) {
        const ingredientName = readlineSync.question(`Bahan ke - ${ingredientNumber}: `);

        if (ingredientName === '_') {
            break;
        }

        const unit = readlineSync.question(`Satuan bahan ke - ${ingredientNumber}: `);
        const amount = readlineSync.question(`Jumlah bahan ke - ${ingredientNumber}: `);

        ingredients.push(`${ingredientName} - ${amount} ${unit}`);
        ingredientNumber++;
    }

    console.log('Masukan langkah-langkah (tekan underscore untuk menghentikan penambahan langkah): ');
    let steps = [];
    let stepNumber = 1;

    while (true) {
        const step = readlineSync.question(`Langkah ke - ${stepNumber}: `);

        if (step === '_') {
            break;
        }

        steps.push(step);
        stepNumber++;
    }

    const newRecipe = {
        name: recipeName,
        ingredients: ingredients,
        steps: steps,
    };

    recipes.push(newRecipe);
    saveRecipes();
    console.log('Resep berhasil ditambahkan!');
}

function searchRecipe() {
    console.log('Cari Resep');
    const searchName = readlineSync.question('Masukan nama resep: ');

    const foundRecipe = recipes.find(recipe => recipe.name.toLowerCase() === searchName.toLowerCase());

    if (foundRecipe) {
        console.log('Resep ditemukan!');
        console.log(`Nama Resep: ${foundRecipe.name}`);
        console.log('Bahan-bahan:');
        foundRecipe.ingredients.forEach(ingredient => console.log(ingredient));
        console.log('Langkah-langkah:');
        foundRecipe.steps.forEach((step, index) => console.log(`${index + 1}. ${step}`));
    } else {
        console.log('Resep tidak ditemukan.');
    }
}

function deleteRecipe() {
    console.log('Hapus Resep');
    recipes.forEach((recipe, index) => console.log(`${index + 1}. ${recipe.name}`));

    const recipeIndex = readlineSync.question('Pilih Resep yang akan dihapus [1-3]: ');
    const recipeToDelete = recipes[recipeIndex - 1];

    if (recipeToDelete) {
        recipes = recipes.filter(recipe => recipe !== recipeToDelete);
        saveRecipes();
        console.log('Resep berhasil dihapus!');
    } else {
        console.log('Resep tidak ditemukan.');
    }
}

function main() {
    loadRecipes();

    while (true) {
        console.log('\nProgram Resep Makanan');
        console.log('=====================');
        console.log('1. Tambah Resep');
        console.log('2. Cari Resep');
        console.log('3. Hapus Resep');
        console.log('4. Keluar');

        const choice = readlineSync.question('Pilih Menu [1-4]: ');

        switch (choice) {
            case '1':
                addRecipe();
                break;
            case '2':
                searchRecipe();
                break;
            case '3':
                deleteRecipe();
                break;
            case '4':
                process.exit();
            default:
                console.log('Pilihan tidak valid. Silakan pilih lagi.');
        }
    }
}

main();
