let foodLog = [];
let workoutLog = [];

function addFood() {
    let calories = document.getElementById('calories').value;
    let fats = document.getElementById('fats').value;
    let protein = document.getElementById('protein').value;
    let carbs = document.getElementById('carbs').value;
    
    if (calories && fats && protein && carbs) {
        let foodItem = {
            calories: parseFloat(calories),
            fats: parseFloat(fats),
            protein: parseFloat(protein),
            carbs: parseFloat(carbs)
        };
        foodLog.push(foodItem);
        updateFoodLog();
        updateIntakeChart();
    }
}

function updateFoodLog() {
    let foodLogElement = document.getElementById('food-log');
    foodLogElement.innerHTML = '';
    foodLog.forEach((item, index) => {
        let listItem = document.createElement('li');
        listItem.innerText = `Calories: ${item.calories}, Fats: ${item.fats}g, Protein: ${item.protein}g, Carbs: ${item.carbs}g`;
        foodLogElement.appendChild(listItem);
    });
}