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
            array.push(randomIntFromIntervals(5, 700));
        }
        this.setState({array});
    }

    mergeSort() {
        const animations = algo.getMergeSortAnimations(this.state.array);
        for (let i = 0; i < animations.length; i++) {
            const arrayBars = document.getElementsByClassName('array-bar');
            // if (i % 2 == 0) {
            //     const [i1, i2] = animations[i];
            //     const style1 = arrayBars[i1].style;
            //     const style2 = arrayBars[i2].style;
            //     setTimeout(() => {
            //         style1.backgroundColor = 'red';
            //         style2.backgroundColor = 'red';
            //     }, i * 20);
            // }
            // else {
            //     const [ic, i1, i2] = animations[i];
            //     const styleC = arrayBars[ic].style;
            //     const style1 = arrayBars[i1].style;
            //     const style2 = arrayBars[i2].style;
            //     setTimeout(() => {
            //         styleC.height = `${style1.height}px`;
            //         style1.backgroundColor = 'darkgreen';
            //         style2.backgroundColor = 'darkgreen';
            //     }, i * 10);
            // }
            const [ic, i1, i2, newHeight] = animations[i];
            const styleC = arrayBars[ic].style;
            const style1 = arrayBars[i1].style;
            const style2 = arrayBars[i2].style;
            setTimeout(() => {
                style1.backgroundColor = 'red';
                style2.backgroundColor = 'red';
            }, i * 9);
            
            setTimeout(() => {
                styleC.height = `${newHeight}px`;
            }, i * 9 + 3);
            setTimeout(() => {
                style1.backgroundColor = 'darkgreen';
                style2.backgroundColor = 'darkGreen';
            }, i * 9 + 6);
        }
    }

    quickSort() {

    }

    heapSort() {

    }

    bubbleSort() {

    }

    render() {
        const {array} = this.state;

        return (
            <div className='array-container'>
                {array.map((value, idx) => (
                    <div className="array-bar" key={idx} style={{height: `${value}px`}}>
                    </div>
                ))}
                <div className="menu">
                    <button onClick={() => this.resetArray()}>Generate Values</button>
                    <button onClick={() => this.mergeSort()}>Merge Sort</button>
                    <button onClick={() => this.quickSort()}>Quick Sort</button>
                    <button onClick={() => this.heapSort()}>Heap Sort</button>
                    <button onClick={() => this.bubbleSort()}>Bubble Sort</button>
                </div>
            </div>
        );
    }
}

function randomIntFromIntervals(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}