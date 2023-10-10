// script.js

document.addEventListener('DOMContentLoaded', () => {
    const playerGrid = document.getElementById('player-grid');
    const videoPlayer = document.getElementById('video-player');
    const playerImage = document.getElementById('player-image');
    const playerStatsTable = document.getElementById('player-stats-table');
    
    // Fetch the CSV file and parse it
    fetch('nba75_highlights.csv')
        .then(response => response.text())
        .then(data => {
            const rows = data.split('\n');
            
            // Remove the header row
            const header = rows.shift().split(',');
            
            rows.forEach(row => {
                const columns = row.split(',');
                const playerName = columns[0];
                const videoURL = columns[1];
                const imageURL = columns[2];
                const playerStats = columns.slice(3); // Get statistics
                
                // Create a player element
                const playerElement = document.createElement('div');
                playerElement.className = 'player';
                
                // Create an image element for the player
                const imageElement = document.createElement('img');
                imageElement.src = imageURL;
                imageElement.alt = playerName;
                playerElement.appendChild(imageElement);
                
                // Create a player name element
                const nameElement = document.createElement('div');
                nameElement.className = 'player-name';
                nameElement.textContent = playerName;
                
                playerElement.addEventListener('click', () => {
                    videoPlayer.src = videoURL;
                    playerImage.src = imageURL;
                
                    // Clear existing statistics
                    playerStatsTable.innerHTML = '';
                
                    // Create and add player statistics as two rows in the table
                    const statTitleRow = document.createElement('tr');
                    const statValueRow = document.createElement('tr');
                
                    for (let i = 0; i < header.length - 3; i++) {
                        const statTitleCell = document.createElement('th');
                        statTitleCell.textContent = header[i + 3];
                        statTitleRow.appendChild(statTitleCell);
                
                        const statValueCell = document.createElement('td');
                        statValueCell.textContent = playerStats[i];
                        statValueRow.appendChild(statValueCell);
                    }
                
                    playerStatsTable.appendChild(statTitleRow);
                    playerStatsTable.appendChild(statValueRow);
                });
                
                // Append image and name elements to the player element
                playerElement.appendChild(nameElement);
                
                // Append the player element to the grid
                playerGrid.appendChild(playerElement);
            });
        })
        .catch(error => console.error('Error loading CSV:', error));
});
