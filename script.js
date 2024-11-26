// scripts.js

// Dummy location for demonstration
const targetLat = 26.880556; // 26°52'50"N
const targetLng = 75.751944; // 75°45'19"E

// Function to handle Attendance
function markAttendance() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
            const userLat = position.coords.latitude;
            const userLng = position.coords.longitude;

            // Calculate distance from target
            const distance = calculateDistance(userLat, userLng, targetLat, targetLng);

            // Attendance Logic
            if (distance <= 25) {
                alert("Verified for today! Attendance marked.");
            } else if (distance <= 50) {
                alert("You are late! Go to class fast for attendance.");
            } else if (distance <= 400) {
                alert("You may be marked absent soon!");
            } else {
                alert("You are absent today. Enjoy the day!");
            }
        }, (error) => {
            alert("Error fetching location. Please enable location services.");
        });
    } else {
        alert("Geolocation is not supported by your browser.");
    }
}

// Haversine Formula for Distance
function calculateDistance(lat1, lon1, lat2, lon2) {
    const R = 6371; // Earth's radius in km
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
              Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
              Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c * 1000; // Distance in meters
}
