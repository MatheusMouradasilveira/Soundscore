function showExercise(exercise) {
    const exercises = document.querySelectorAll('.exercise-container');
    exercises.forEach(ex => ex.style.display = 'none');
    
    const exerciseContainer = document.getElementById(`exercise-${exercise}`);
    exerciseContainer.style.display = 'block';
}