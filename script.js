let foodLog = [];
let workoutLog = [];
let waterLog = [];
let sleepLog = [];
let goals = {
    calories: 0,
    fats: 0,
    protein: 0,
    carbs: 0
};

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
        updateGoalsLog();
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

function addWaterIntake() {
    let waterIntake = document.getElementById('water-intake').value;
    
    if (waterIntake) {
        waterLog.push(parseFloat(waterIntake));
        updateWaterLog();
        updateWaterChart();
    }
}

function updateWaterLog() {
    let waterLogElement = document.getElementById('water-log');
    waterLogElement.innerHTML = '';
    waterLog.forEach((item, index) => {
        let listItem = document.createElement('li');
        listItem.innerText = `Water Intake: ${item} ml`;
        waterLogElement.appendChild(listItem);
    });
}

function addSleep() {
    let sleepHours = document.getElementById('sleep-hours').value;
    
    if (sleepHours) {
        sleepLog.push(parseFloat(sleepHours));
        updateSleepLog();
        updateSleepChart();
    }
}

function updateSleepLog() {
    let sleepLogElement = document.getElementById('sleep-log');
    sleepLogElement.innerHTML = '';
    sleepLog.forEach((item, index) => {
        let listItem = document.createElement('li');
        listItem.innerText = `Sleep: ${item} hours`;
        sleepLogElement.appendChild(listItem);
    });
}

function setGoals() {
    goals.calories = parseFloat(document.getElementById('goal-calories').value);
    goals.fats = parseFloat(document.getElementById('goal-fats').value);
    goals.protein = parseFloat(document.getElementById('goal-protein').value);
    goals.carbs = parseFloat(document.getElementById('goal-carbs').value);
    updateGoalsLog();
}

function updateGoalsLog() {
    let goalsLogElement = document.getElementById('goals-log');
    goalsLogElement.innerHTML = '';
    let totalCalories = foodLog.reduce((sum, item) => sum + item.calories, 0);
    let totalFats = foodLog.reduce((sum, item) => sum + item.fats, 0);
    let totalProtein = foodLog.reduce((sum, item) => sum + item.protein, 0);
    let totalCarbs = foodLog.reduce((sum, item) => sum + item.carbs, 0);
    let listItem = document.createElement('li');
    listItem.innerText = `Calories: ${totalCalories}/${goals.calories}, Fats: ${totalFats}/${goals.fats}g, Protein: ${totalProtein}/${goals.protein}g, Carbs: ${totalCarbs}/${goals.carbs}g`;
    goalsLogElement.appendChild(listItem);
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

function updateWorkoutChart() {
    let cardio = workoutLog.filter(item => item.type === 'Cardio').reduce((sum, item) => sum + item.duration, 0);
    let strength = workoutLog.filter(item => item.type === 'Strength').reduce((sum, item) => sum + item.duration, 0);
    let flexibility = workoutLog.filter(item => item.type === 'Flexibility').reduce((sum, item) => sum + item.duration, 0);
    let endurance = workoutLog.filter(item => item.type === 'Endurance').reduce((sum, item) => sum + item.duration, 0);

    let ctx = document.getElementById('workoutChart').getContext('2d');
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Cardio', 'Strength', 'Flexibility', 'Endurance'],
            datasets: [{
                data: [cardio, strength, flexibility, endurance],
                backgroundColor: ['#0074D9', '#7FDBFF', '#39CCCC', '#001f3f']
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false
        }
    });
}

function updateWaterChart() {
    let totalWater = waterLog.reduce((sum, item) => sum + item, 0);

    let ctx = document.getElementById('waterChart').getContext('2d');
    new Chart(ctx, {
        type: 'line',
        data: {
            labels: waterLog.map((_, index) => `Entry ${index + 1}`),
            datasets: [{
                data: waterLog,
                backgroundColor: '#0074D9',
                borderColor: '#0074D9',
                fill: false
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false
        }
    });
}

function updateSleepChart() {
    let totalSleep = sleepLog.reduce((sum, item) => sum + item, 0);
    let averageSleep = totalSleep / sleepLog.length;

    let ctx = document.getElementById('sleepChart').getContext('2d');
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: sleepLog.map((_, index) => `Day ${index + 1}`),
            datasets: [{
                data: sleepLog,
                backgroundColor: '#7FDBFF'
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}