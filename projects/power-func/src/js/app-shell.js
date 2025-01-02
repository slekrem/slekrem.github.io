import { html, LitElement } from 'lit';
import Chart from 'chart.js/auto';
import 'chartjs-adapter-moment';
import priceData from './price-data.json'

export default class AppShell extends LitElement {
    createRenderRoot() { return this; }
    render = () => {
        return html`
        <nav class="navbar bg-body-tertiary">
            <div class="container-fluid">
                <a class="navbar-brand" href="#">y=ax^r</a>
            </div>
        </nav>
        <div class="container mt-3">
            <div class="row">
                <div class="col-md-6">
                    <form>
                        <div class="mb-3">
                            <label class="form-label">a:</label>
                            <input class="form-control">
                        </div>
                        <div class="mb-3">
                            <label class="form-label">r:</label>
                            <input class="form-control">
                        </div>
                    </form>
                </div>
                <div class="col-md-6">
                    asd
                </div>
            </div>
        </div>
        <hr>
        <div class="container-fluid">
            <div class="row">
                <div class="col-md-6">
                    <canvas id="canvas0"></canvas>
                </div>
                <div class="col-md-6">
                    <canvas id="canvas1"></canvas>
                </div>
            </div>
            <div class="row">
                <div class="col-md-6">
                    <canvas id="canvas2"></canvas>
                </div>
                <div class="col-md-6">
                    <canvas id="canvas3"></canvas>
                </div>
            </div>
        </div>
        `;
    }

    firstUpdated = async () => {
        //console.log(priceData);
        const data = [];
        let days = 1;
        let price = 0.01;
        while (data.length <= 10) {
            var powResult = 1.0117e-17 * Math.pow(days, 5.82);
            if (powResult >= price && powResult <= price * 10) {
                data.push({ x: days, y: powResult });
                price = price * 10;
            }
            ++days;
        }

        const canvas0 = this.querySelector('#canvas0');
        const chart0 = new Chart(canvas0, {
            type: 'line',
            data: {
                datasets: [{
                    label: 'Logarithmisch skaliert',
                    data: data,
                    borderColor: 'rgba(75, 192, 192, 1)',
                    backgroundColor: 'rgba(75, 192, 192, 0.2)',
                    tension: 0.1
                }]
            },
            options: {
                responsive: true,
                scales: {
                    x: {
                        type: 'logarithmic',
                        title: {
                            display: true,
                            text: 'Logarithmische x-Achse'
                        },
                        ticks: {
                            callback: function (value, index, ticks) {
                                const genesisBlockDate = new Date(2009, 0, 3);
                                const date = new Date(genesisBlockDate);
                                date.setDate(genesisBlockDate.getDate() + value);
                                return date.toLocaleDateString();
                            }
                        }
                    },
                    y: {
                        type: 'logarithmic',
                        title: {
                            display: true,
                            text: 'Logarithmische y-Achse'
                        }
                    }
                }
            }
        });

        const canvas1 = this.querySelector('#canvas1');
        const chart1 = new Chart(canvas1, {
            type: 'line',
            data: {
                datasets: [{
                    label: 'Price',
                    data: [],
                }]
            },
            options: {
                responsive: true,
                scales: {
                    x: {
                        type: 'time',
                        time: {
                            unit: 'day'
                        },
                        title: {
                            display: true,
                            text: 'Datum'
                        }
                    },
                    y: {
                        beginAtZero: true,
                        title: {
                            display: true,
                            text: 'Wert'
                        }
                    }
                }
            }
        });

        const canvas2 = this.querySelector('#canvas2');
        const chart2 = new Chart(canvas2, {
            type: 'line',
            data: {
                datasets: [{
                    label: 'Price',
                    data: [],
                }, {
                    label: 'Power',
                    data: [],
                }]
            },
            options: {
                responsive: true,
                scales: {
                    x: {
                        type: 'time',
                        time: {
                            unit: 'day'
                        },
                        title: {
                            display: true,
                            text: 'Datum'
                        }
                    },
                    y: {
                        beginAtZero: true,
                        title: {
                            display: true,
                            text: 'Wert'
                        }
                    }
                }
            }
        });

        const canvas3 = this.querySelector('#canvas3');
        const chart3 = new Chart(canvas3, {
            type: 'line',
            data: {
                datasets: [{
                    label: 'Price',
                    data: [],
                }, {
                    label: 'Power',
                    data: [],
                }]
            },
            options: {
                responsive: true,
                scales: {
                    x: {
                        type: 'time',
                        time: {
                            unit: 'day'
                        },
                        title: {
                            display: true,
                            text: 'Datum'
                        }
                    },
                    y: {
                        beginAtZero: true,
                        title: {
                            display: true,
                            text: 'Wert'
                        }
                    }
                }
            }
        });

        const genesisBlockDate = new Date(2009, 0, 3);
        let timestamp = new Date(genesisBlockDate);
        while (timestamp <= Date.now()) {
            const response = await fetch(`https://mempool.space/api/v1/historical-price?currency=USD&timestamp=${timestamp.valueOf() / 1000}`);
            const data = await response.json();
            if (data.prices[0].USD > 0 && !priceData.filter(x => x.time === data.prices[0].time).length) {
                priceData.push(data.prices[0]);
                chart1.data.datasets[0].data.push({
                    x: new Date(data.prices[0].time * 1000),
                    y: data.prices[0].USD
                });

                chart2.data.datasets[0].data.push({
                    x: new Date(data.prices[0].time * 1000),
                    y: data.prices[0].USD
                });
                const d = new Date((data.prices[0].time * 1000) - genesisBlockDate) / (1000 * 60 * 60 * 24);
                const pr = 1.0117e-17 * Math.pow(d, 5.82);
                chart2.data.datasets[1].data.push({
                    x: new Date(data.prices[0].time * 1000),
                    y: pr
                });

                chart3.data.datasets[0].data.push({
                    x: new Date(data.prices[0].time * 1000),
                    y: data.prices[0].USD - pr
                });
                chart3.data.datasets[1].data.push({
                    x: new Date(data.prices[0].time * 1000),
                    y: 0
                });

                chart1.update();
                chart2.update();
                chart3.update();
            }

            timestamp.setDate(timestamp.getDate() + 1);
            if (data.prices[0].time > timestamp.valueOf() / 1000)
                timestamp = new Date(data.prices[0].time * 1000)
            await this._delay(500);
        }

        //this._downloadObjectAsJson(priceData, 'price-data');
    };

    _delay = (time) => new Promise(resolve => setTimeout(resolve, time));

    _downloadObjectAsJson = (exportObj, exportName) => {
        var dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(exportObj));
        var downloadAnchorNode = document.createElement('a');
        downloadAnchorNode.setAttribute("href", dataStr);
        downloadAnchorNode.setAttribute("download", exportName + ".json");
        document.body.appendChild(downloadAnchorNode); // required for firefox
        downloadAnchorNode.click();
        downloadAnchorNode.remove();
    };
}

customElements.define('app-shell', AppShell);