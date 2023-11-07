const displayCoinGeckoTokenInfo = (tokenName, currency = 'usd') => {
    const container = document.getElementById('coingecko-widget');

    fetch(`https://api.coingecko.com/api/v3/simple/price?ids=${tokenName}&vs_currencies=${currency}&include_market_cap=true&include_24hr_vol=true`)
        .then(response => response.json())
        .then(data => {
            const tokenInfo = data[tokenName];
            if (tokenInfo) {
                container.innerHTML = `
                    <h1>${tokenName.toUpperCase()} (${currency.toUpperCase()})</h1>
                    <div class="info">
                        <p class="label">Price:</p> ${formatCurrency(tokenInfo[currency])}
                    </div>
                    <div class="info">
                        <p class="label">Market Cap:</p> ${formatCurrency(tokenInfo[`${currency}_market_cap`])}
                    </div>
                    <div class="info">
                        <p class="label">Volume:</p> ${formatCurrency(tokenInfo[`${currency}_24h_vol`])}
                    </div>
                `;
            } else {
                container.innerHTML = `<p class="error-message">Token not found or API request failed.</p>`;
            }
        })
        .catch(error => {
            container.innerHTML = `<p class="error-message">API request failed. Please try again later.</p>`;
        });
}

const formatCurrency = (number) => {
    if (number >= 1e9) {
        return `$${(number / 1e9).toFixed(2)} B`;
    } else if (number >= 1e6) {
        return `$${(number / 1e6).toFixed(2)} M`;
    } else {
        return `$${number.toFixed(2)}`;
    }
}

displayCoinGeckoTokenInfo('bitcoin', 'usd');

const form = document.getElementById('coingecko-form');
form.addEventListener('submit', (event) => {
    event.preventDefault();
    const selectedToken = document.getElementById('token').value;
    const selectedCurrency = document.getElementById('currency').value;

    displayCoinGeckoTokenInfo(selectedToken, selectedCurrency);
});