import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import '../App.css';

Chart.register(...registerables);

const CompressionSimulator = () => {
    const [bpm, setBpm] = useState(100);
    const [perfusionRate, setPerfusionRate] = useState(2);
    const [deptLen, setDeptLen] = useState(2.5);
    const [dutyCycle, setDutyCycle] = useState(50);
    const [isRunning, setIsRunning] = useState(false);
    const [singleTriangleData, setSingleTriangleData] = useState([]);
    const [repeatedTriangleData, setRepeatedTriangleData] = useState([]);

    const bpmToHertz = (bpm) => {
        return bpm / 60;
    };

    const generateTriangle = (bpm, dutyCycle, perfusionRate, deptLen) => {
        const hertz = bpmToHertz(bpm);
        const period = 1 / hertz;
        const maxPulseWidth = period / perfusionRate;
        const pulseWidth = maxPulseWidth * (dutyCycle / 100);
        const amplitude = deptLen;
        const base = 10;
        const samplesPerPeriod = 250 * period;

        let triangle = [];
        for (let i = 0; i < samplesPerPeriod; i++) {
            const t = (i / 250) % period;
            let y = base;
            if (t < pulseWidth) {
                y -= (t / pulseWidth) * amplitude;
            } else if (t < maxPulseWidth) {
                y -= amplitude - ((t - pulseWidth) / (maxPulseWidth - pulseWidth)) * amplitude;
            }
            triangle.push({x: t, y});
        }
        return triangle;
    };

    useEffect(() => {
        setSingleTriangleData(generateTriangle(bpm, dutyCycle, perfusionRate, deptLen));

        let intervalId;
        let compressionCount = 0;
        let nextTriangleStart = 0;
        if (isRunning) {
            intervalId = setInterval(() => {
                const newTriangle = generateTriangle(bpm, dutyCycle, perfusionRate, deptLen);
                const adjustedTriangle = newTriangle.map(point => ({ x: point.x + nextTriangleStart, y: point.y }));
                setRepeatedTriangleData(prevData => [...prevData, ...adjustedTriangle]);
                nextTriangleStart += newTriangle[newTriangle.length - 1].x;

                compressionCount++;
                if (compressionCount >= 30) {
                    compressionCount = 0;
                    nextTriangleStart = 0;
                    setRepeatedTriangleData([]);
                }
            }, 60000 / bpm);
        }
        return () => clearInterval(intervalId);
    }, [bpm, dutyCycle, perfusionRate, deptLen, isRunning]);
    
    const clearGraph = () => {
        setRepeatedTriangleData([]);
    };

    const chartDataSingle = {
        datasets: [{
            label: 'Single Triangle',
            borderColor: 'rgb(75, 192, 192)',
            borderWidth: 2,
            lineTension: 0,
            data: singleTriangleData
        }]
    };

    const chartDataRepeated = {
        datasets: [{
            label: 'Repeated Triangle',
            borderColor: 'rgb(75, 192, 192)',
            borderWidth: 2,
            lineTension: 0,
            data: repeatedTriangleData
        }]
    };

    const options = {
        scales: {
            x: {
                type: 'linear',
                grid: {
                    color: 'black'
                },
                ticks: {
                    callback: (value) => `${value.toFixed(1)} s`
                }
            },
            y: {
                beginAtZero: true,
                grid: {
                    color: 'black'
                },
                ticks: {
                    callback: (value) => `${value.toFixed(1)} in`
                }
            }
        },
        plugins: {
            legend: {
                labels: {
                    color: 'black'
                }
            }
        },
        layout: {
            padding: {
                top: 20,
                right: 20,
                bottom: 20,
                left: 20
            }
        },
        backgroundColor: 'white',
        animation: {
            duration: 0
        },
        maintainAspectRatio: false
    };

    return (
        <div>
            <Breadcrumbs aria-label="breadcrumb"
            sx={{
                margin: '30px'
            }}>
                <Link color="inherit" href="/">
                    Home
                </Link>
                <Link color="inherit" href="/simuladores">
                    Simuladores
                </Link>
                <Typography color="textPrimary">Simulador de Compresiones Torácicas</Typography>
            </Breadcrumbs>
            <h1>
                Simulador de señal de compresiones torácicas
            </h1>

            
            <div style={{ display: 'flex', alignItems: 'center', width: '100%' }}>
            <div style={{ width: '50%', textAlign: 'right' }}>
                <div>
                    <label>Frecuencia (BPMs): </label>
                    <input type="number" value={bpm} onChange={(e) => setBpm(parseFloat(e.target.value))} />
                </div>
                <div>
                    <label>Duty Cycle (%): </label>
                    <input type="number" value={dutyCycle} onChange={(e) => setDutyCycle(parseFloat(e.target.value))} />
                </div>
                <div>
                    <label>Taza de Perfusión (1/n): </label>
                    <input type="number" value={perfusionRate} onChange={(e) => setPerfusionRate(parseFloat(e.target.value))} />
                </div>
                <div>
                    <label>Profundidad (in): </label>
                    <input type="number" value={deptLen} onChange={(e) => setDeptLen(parseFloat(e.target.value))} />
                </div>
            </div>
                <div style={{ width: '30vw', height: '30vw' }}> {/* Ajusta esta altura según tus necesidades */}
                <Line data={chartDataSingle} options={options} />
                </div>
            </div>

            <div>
                <button onClick={() => setIsRunning(!isRunning)}>{isRunning ? "Parar" : "Continuar"}</button>
                <button onClick={clearGraph}>Limpiar Gráfica</button>
                <h3>
                Señal transmitida
                </h3>
                <div style={{ width: '80%', marginTop: '20px', alignItems: 'center', marginLeft: '10%', height: "60vh" }}>
                    <Line data={chartDataRepeated} options={options} />
                </div>
            </div>
        </div>
    );
};

export default CompressionSimulator;
