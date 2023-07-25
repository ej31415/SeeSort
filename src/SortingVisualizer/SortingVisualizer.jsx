import React from 'react';
import * as algo from '../Algorithms/sortingAlgorithms.js';
import './SortingVisualizer.css';

export default class SortingVisualizer extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            array: [],
        };
    }

    componentDidMount() {
        this.resetArray();
    }

    resetArray() {
        const array = [];
        for (let i = 0; i < 300; i++) {
            array.push(randomIntFromIntervals(5, 650));
        }
        this.setState({array});
        const arrayBars = document.getElementsByClassName('array-bar');
        for (let i = 0; i < arrayBars.length; i++) {
            arrayBars[i].style.backgroundColor = 'darkseagreen';
        }
    }

    mergeSort() {
        const animations = algo.getMergeSortAnimations(this.state.array);
        for (let i = 0; i < animations.length; i++) {
            const arrayBars = document.getElementsByClassName('array-bar');
            const [ic, i1, i2, newHeight] = animations[i];
            const styleC = arrayBars[ic].style;
            const style1 = arrayBars[i1].style;
            const style2 = arrayBars[i2].style;
            setTimeout(() => {
                style1.backgroundColor = 'red';
                style2.backgroundColor = 'red';
            }, i * 3);
            
            setTimeout(() => {
                styleC.height = `${newHeight}px`;
            }, i * 3 + 1);
            setTimeout(() => {
                style1.backgroundColor = 'darkgreen';
                style2.backgroundColor = 'darkGreen';
            }, i * 3 + 2);
        }
    }

    quickSort() {

    }

    heapSort() {

    }

    bubbleSort() {
        const animations = algo.getBubbleSortAnimations(this.state.array);
        for (let i = 0; i < animations.length; i++) {
            const arrayBars = document.getElementsByClassName('array-bar');
            const [i1, i2, nH1, nH2, swap, last] = animations[i];
            const style1 = arrayBars[i1].style;
            const style2 = arrayBars[i2].style;
            setTimeout(() => {
                style1.backgroundColor = 'red';
                style2.backgroundColor = 'red';
            }, i * 3);
            setTimeout(() => {
                if (swap) {
                    style1.height = `${nH2}px`;
                    style2.height = `${nH1}px`;
                }
            }, i * 3 + 1);
            setTimeout(() => {
                if (last){    
                    style1.backgroundColor = 'darkseagreen';
                    style2.backgroundColor = 'darkgreen';
                }
                else {
                    style1.backgroundColor = 'darkseagreen';
                    style2.backgroundColor = 'darkseagreen';
                }
            }, i * 3 + 2);
        }
    }

    selectionSort() {
        const animations = algo.getSelectionSortAnimations(this.state.array);
        for (let i = 0; i < animations.length; i++) {
            const arrayBars = document.getElementsByClassName('array-bar');
            const [i1, i2, nH1, nH2, swap] = animations[i];
            const style1 = arrayBars[i1].style;
            const style2 = arrayBars[i2].style;
            setTimeout(() => {
                style1.backgroundColor = 'red';
                style2.backgroundColor = 'red';
            }, i * 3);
            setTimeout(() => {
                if (swap) {
                    style1.height = `${nH2}px`;
                    style2.height = `${nH1}px`;
                }
            }, i * 3 + 1);
            setTimeout(() => {
                if (swap) {
                    style1.backgroundColor = 'darkgreen';
                    if (i1 != i2) {
                        style2.backgroundColor = 'darkseagreen';
                    }
                }
                else {
                    style2.backgroundColor = 'darkseagreen';
                }
            }, i * 3 + 2);
        }
    }

    render() {
        const {array} = this.state;

        return (
            <div body>
                <div className='array-container'>
                    {array.map((value, idx) => (
                        <div className="array-bar" key={idx} style={{backgroundColor: 'darkseagreen', height: `${value}px`}}>
                        </div>
                    ))}
                </div>
                <nav id='navbar'>
                    <div class='container'>
                        <button onClick={() => this.resetArray()}>Generate Values</button>
                    </div>
                    <div class='container'>
                        <button onClick={() => this.mergeSort()}>Merge Sort</button>
                        <button onClick={() => this.quickSort()}>Quick Sort</button>
                        <button onClick={() => this.heapSort()}>Heap Sort</button>
                        <button onClick={() => this.bubbleSort()}>Bubble Sort</button>
                        <button onClick={() => this.selectionSort()}>Selection Sort</button>
                    </div>
                </nav>
            </div>
        );
    }
}

function randomIntFromIntervals(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}