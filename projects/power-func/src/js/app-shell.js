import { html, LitElement } from 'lit';
import Chart from 'chart.js/auto';
import 'chartjs-adapter-moment';

export default class AppShell extends LitElement {
    createRenderRoot() { return this; }
    render = () => {
        return html`
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
            if (data.prices[0].USD > 0) {
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
                    y: (data.prices[0].USD * d - pr * d) / pr
                });
                chart3.data.datasets[1].data.push({
                    x: new Date(data.prices[0].time * 1000),
                    y: 0
                });

                chart1.update();
                chart2.update();
                chart3.update();
            }

            timestamp.setDate(timestamp.getDate() + 7);
            if (data.prices[0].time > timestamp.valueOf() / 1000)
                timestamp = new Date(data.prices[0].time * 1000)
            await this._delay(500);
        }
    };

    _delay = (time) => new Promise(resolve => setTimeout(resolve, time));
}

customElements.define('app-shell', AppShell);