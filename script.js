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

function addWorkout() {
    let workoutType = document.getElementById('workout-type').value;
    let workoutDuration = document.getElementById('workout-duration').value;
    
    if (workoutType && workoutDuration) {
        let workoutItem = {
            type: workoutType,
            duration: parseFloat(workoutDuration)
        };
        workoutLog.push(workoutItem);
        updateWorkoutLog();
        updateWorkoutChart();
    }
}

function updateWorkoutLog() {
    let workoutLogElement = document.getElementById('workout-log');
    workoutLogElement.innerHTML = '';
    workoutLog.forEach((item, index) => {
        let listItem = document.createElement('li');
        listItem.innerText = `Type: ${item.type}, Duration: ${item.duration} minutes`;
        workoutLogElement.appendChild(listItem);
    });
}

function updateIntakeChart() {
    let totalCalories = foodLog.reduce((sum, item) => sum + item.calories, 0);
    let totalFats = foodLog.reduce((sum, item) => sum + item.fats, 0);
    let totalProtein = foodLog.reduce((sum, item) => sum + item.protein, 0);
    let totalCarbs = foodLog.reduce((sum, item) => sum + item.carbs, 0);

    let ctx = document.getElementById('intakeChart').getContext('2d');
    new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: ['Calories', 'Fats', 'Protein', 'Carbs'],
            datasets: [{
                data: [totalCalories, totalFats, totalProtein, totalCarbs],
                backgroundColor: ['#0074D9', '#7FDBFF', '#39CCCC', '#001f3f']
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false
        }
    });
}
