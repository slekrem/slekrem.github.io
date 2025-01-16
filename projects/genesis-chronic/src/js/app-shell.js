import { html, LitElement } from 'lit';
import Chart from 'chart.js/auto';
import e0 from './data/0.json';
import e1 from './data/1.json';
import e2 from './data/2.json';
import e3 from './data/3.json';
import e4 from './data/4.json';
import 'chartjs-adapter-moment';

export default class AppShell extends LitElement {
    createRenderRoot() { return this; }
    render = () => {
        return html`
        <div class="container my-5 vh-100">
            <h2 class="text-center display-4 mb-3">Epoch 1</h2>
            <p class="text-center text-muted">2009-2012</p>
            <div class="row justify-content-center mt-4">
                <div class="col-12">
                    <div class="card shadow">
                        <div class="card-body">
                            <canvas id="canvas0" class="card-img-top"></canvas>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="container my-5 vh-100">
            <h2 class="text-center display-4 mb-3">Epoch 2</h2>
            <p class="text-center text-muted">2012-2016</p>
            <div class="row justify-content-center mt-4">
                <div class="col-12">
                    <div class="card shadow">
                        <div class="card-body">
                            <canvas id="canvas1" class="card-img-top"></canvas>
                            <h5 class="card-title text-center"></h5>
                            <p class="card-text"></p>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="container my-5 vh-100">
            <h2 class="text-center display-4 mb-3">Epoch 3</h2>
            <p class="text-center text-muted">2016-2020</p>
            <div class="row justify-content-center mt-4">
                <div class="col-12">
                    <div class="card shadow">
                        <div class="card-body">
                            <canvas id="canvas2" class="card-img-top"></canvas>
                            <h5 class="card-title text-center"></h5>
                            <p class="card-text"></p>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="container my-5 vh-100">
            <h2 class="text-center display-4 mb-3">Epoch 4</h2>
            <p class="text-center text-muted">2020-2024</p>
            <div class="row justify-content-center mt-4">
                <div class="col-12">
                    <div class="card shadow">
                        <div class="card-body">
                            <canvas id="canvas3" class="card-img-top"></canvas>
                            <h5 class="card-title text-center"></h5>
                            <p class="card-text"></p>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="container my-5 vh-100">
            <h2 class="text-center display-4 mb-3">Epoch 5</h2>
            <p class="text-center text-muted">2024-2028</p>
            <div class="row justify-content-center mt-4">
                <div class="col-12">
                    <div class="card shadow">
                        <div class="card-body">
                            <canvas id="canvas4" class="card-img-top"></canvas>
                            <h5 class="card-title text-center"></h5>
                            <p class="card-text"></p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        `;
    }

    firstUpdated = async () => {
        new Chart(this.querySelector('#canvas0'), {
            type: 'line',
            data: {
                datasets: [{
                    label: 'Price',
                    data: e0.filter(x => x.blockHeight >= 0 && x.blockHeight <= 210000)
                        .sort(this._sortBlockHeight)
                        .map(this._mapHistoricalPrice),
                }, {
                    label: 'Power Law Price',
                    data: e0.filter(x => x.blockHeight >= 0 && x.blockHeight <= 210000)
                        .sort(this._sortBlockHeight)
                        .map(this._mapPowPrice),
                }]
            },
            options: {
                responsive: true,
                scales: {
                    x: {
                        type: 'time',
                        title: {
                            display: false,
                            text: ''
                        }
                    },
                    y: {
                        type: 'logarithmic',
                        title: {
                            display: false,
                            text: ''
                        }
                    }
                }
            }
        });
        new Chart(this.querySelector('#canvas1'), {
            type: 'line',
            data: {
                datasets: [{
                    label: 'Price',
                    data: e1.filter(x => x.blockHeight >= 210000 && x.blockHeight <= 420000)
                        .sort(this._sortBlockHeight)
                        .map(this._mapHistoricalPrice)
                }, {
                    label: 'Power Law Price',
                    data: e1.filter(x => x.blockHeight >= 210000 && x.blockHeight <= 420000)
                        .sort(this._sortBlockHeight)
                        .map(this._mapPowPrice)
                }]
            },
            options: {
                responsive: true,
                scales: {
                    x: {
                        type: 'time',
                        title: {
                            display: false,
                            text: ''
                        }
                    },
                    y: {
                        type: 'logarithmic',
                        title: {
                            display: false,
                            text: ''
                        }
                    }
                }
            }
        });
        new Chart(this.querySelector('#canvas2'), {
            type: 'line',
            data: {
                datasets: [{
                    label: 'Price',
                    data: e2.filter(x => x.blockHeight >= 420000 && x.blockHeight <= 630000)
                        .sort(this._sortBlockHeight)
                        .map(this._mapHistoricalPrice)
                }, {
                    label: 'Power Law Price',
                    data: e2.filter(x => x.blockHeight >= 420000 && x.blockHeight <= 630000)
                        .sort(this._sortBlockHeight)
                        .map(this._mapPowPrice)
                }]
            },
            options: {
                responsive: true,
                scales: {
                    x: {
                        type: 'time',
                        title: {
                            display: false,
                            text: ''
                        }
                    },
                    y: {
                        type: 'logarithmic',
                        title: {
                            display: false,
                            text: ''
                        }
                    }
                }
            }
        });
        new Chart(this.querySelector('#canvas3'), {
            type: 'line',
            data: {
                datasets: [{
                    label: 'Price',
                    data: e3.filter(x => x.blockHeight >= 630000 && x.blockHeight <= 840000)
                        .sort(this._sortBlockHeight)
                        .map(this._mapHistoricalPrice)
                }, {
                    label: 'Power Law Price',
                    data: e3.filter(x => x.blockHeight >= 630000 && x.blockHeight <= 840000)
                        .sort(this._sortBlockHeight)
                        .map(this._mapPowPrice)
                }]
            },
            options: {
                responsive: true,
                scales: {
                    x: {
                        type: 'time',
                        title: {
                            display: false,
                            text: ''
                        }
                    },
                    y: {
                        type: 'logarithmic',
                        title: {
                            display: false,
                            text: ''
                        }
                    }
                }
            }
        });

        const chart = new Chart(this.querySelector('#canvas4'), {
            type: 'line',
            data: {
                datasets: [{
                    label: 'Price',
                    data: e4.filter(x => x.blockHeight >= 840000 && x.blockHeight <= 1050000 && x.historicalPrice)
                        .sort(this._sortBlockHeight)
                        .map(this._mapHistoricalPrice)
                }, {
                    label: 'Power Law Price',
                    data: e4.filter(x => x.blockHeight >= 840000 && x.blockHeight <= 1050000 && x.block)
                        .sort(this._sortBlockHeight)
                        .map(this._mapPowPrice)
                }, {
                    label: 'Power Law (Future)',
                    data: []
                }]
            },
            options: {
                responsive: true,
                scales: {
                    x: {
                        type: 'time',
                        title: {
                            display: false,
                            text: ''
                        }
                    },
                    y: {
                        type: 'logarithmic',
                        title: {
                            display: false,
                            text: ''
                        }
                    }
                }
            }
        });

        const blockHeight = Math.max(...e4.filter(x => x.blockHeight && x.hash).map(x => x.blockHeight));
        const blockTipHeight = await this._GETBlockTipHeight();
        let block = null;
        for (var i = blockHeight; i <= blockTipHeight; i += 144) {
            const hash = await this._GETBlockHeight(i);
            block = await this._GETBlock(hash);
            const historicalPrice = await this._GETHistoricalPrice(block.timestamp);
            chart.data.datasets[0].data.push({
                x: new Date(block.timestamp * 1000),
                y: historicalPrice
            });
        }

        let start = new Date("01/03/2009");
        let current = new Date(block.timestamp * 1000);
        for (var i = blockTipHeight; i < (210000 * 5); i += 144) {
            let diffInTime = current.getTime() - start.getTime();
            let diffInDays = Math.round(diffInTime / (1000 * 3600 * 24));
            const powPrice = Number.parseFloat((1.0117e-17 * Math.pow(diffInDays, 5.82)).toFixed(2));
            chart.data.datasets[2].data.push({
                x: new Date(current),
                y: powPrice
            });
            current.setDate(current.getDate() + 1);
        }
        chart.update();
    };

    _mapHistoricalPrice = x => {
        return {
            x: new Date(x.historicalPrice.prices[0].time * 1000),
            y: x.historicalPrice.prices[0].USD
        };
    };

    _mapPowPrice = x => {
        return {
            x: new Date(x.block.timestamp * 1000),
            y: x.powPrice
        };
    };

    _sortBlockHeight = (a, b) => a.blockHeight - b.blockHeight;

    _GETHistoricalPrice = async (timestamp) => {
        const response = await fetch(`https://mempool.space/api/v1/historical-price?currency=USD&timestamp=${timestamp}`);
        const data = await response.json();
        return data.prices[0].USD;
    };

    _GETBlockHeight = async (height) => {
        const response = await fetch(`https://mempool.space/api/block-height/${height}`);
        const hash = await response.text();
        return hash;
    };

    _GETBlock = async (hash) => {
        const response = await fetch(`https://mempool.space/api/block/${hash}`);
        const block = await response.json();
        return block;
    };

    _GETBlockTipHeight = async () => {
        const response = await fetch('https://mempool.space/api/blocks/tip/height');
        const height = await response.text();
        return Number.parseInt(height);
    };
}

customElements.define('app-shell', AppShell);
