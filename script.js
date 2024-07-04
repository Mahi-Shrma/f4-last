const url = 'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false';
        const tbody = document.getElementById('tbody');
        const searchInput = document.getElementById('search');
        let data = [];

        // Fetch data using .then method
        fetch(url)
            .then(response => response.json())
            .then(json => {
                data = json;
                renderTable(data);
            })
            .catch(error => console.error(error));

        // Fetch data using async/await method
        async function fetchData() {
            try {
                const response = await fetch(url);
                const json = await response.json();
                data = json;
                renderTable(data);
            } catch (error) {
                console.error(error);
            }
        }
        fetchData();

        // Render table
        function renderTable(data) {
            tbody.innerHTML = '';
            data.forEach(item => {
                const tr = document.createElement('tr');
                const tdName = document.createElement('td');
                const tdId = document.createElement('td');
                const tdImage = document.createElement('td');
                const tdSymbol = document.createElement('td');
                const tdCurrentPrice = document.createElement('td');
                const tdTotalVolume = document.createElement('td');
                const tdMarketCap = document.createElement('td');
                const tdPercentageChange = document.createElement('td');
                tdName.innerText = item.name;
                tdId.innerText = item.id;
                tdImage.innerHTML = `<img src="${item.image}" alt="${item.name}" width="50" height="50">`;
                tdSymbol.innerText = item.symbol;
                tdCurrentPrice.innerText = item.current_price;
                tdTotalVolume.innerText = item.total_volume;
                tdMarketCap.innerText = item.market_cap;
                tdPercentageChange.innerText = item.price_change_percentage_24h;
                tr.appendChild(tdName);
                tr.appendChild(tdId);
                tr.appendChild(tdImage);
                tr.appendChild(tdSymbol);
                tr.appendChild(tdCurrentPrice);
                tr.appendChild(tdTotalVolume);
                tr.appendChild(tdMarketCap);
                tr.appendChild(tdPercentageChange);
                tbody.appendChild(tr);
            });
        }

        // Search function
        function search() {
            const value = searchInput.value.toLowerCase().trim();
            const filteredData = data.filter(item => item.name.toLowerCase().includes(value));
            renderTable(filteredData);
        }

        // Sort function
        function sort() {
            data.sort((a, b) => b.market_cap - a.market_cap || b.price_change_percentage_24h - a.price_change_percentage_24h);
            renderTable(data);
        }