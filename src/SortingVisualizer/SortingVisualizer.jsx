import React from 'react';
import * as algo from '../Algorithms/sortingAlgorithms.js';
import './SortingVisualizer.css';

const UNSORTED_COLOR = 'darkseagreen';
const TEMP_COLOR = 'red';
const SORT_COLOR = 'gold';
const COMPLETED_COLOR = 'darkgreen';

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
            arrayBars[i].style.backgroundColor = UNSORTED_COLOR;
        }
    }

    completeSort(animations) {
        const arrayBars = document.getElementsByClassName('array-bar');
        setTimeout(() => {
            for (let i = 0; i < arrayBars.length; i++) {
                arrayBars[i].style.backgroundColor = COMPLETED_COLOR;
            }
        }, animations.length * 3 + 250);
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
                style1.backgroundColor = TEMP_COLOR;
                style2.backgroundColor = TEMP_COLOR;
            }, i * 3);
            
            setTimeout(() => {
                styleC.height = `${newHeight}px`;
            }, i * 3 + 1);
            setTimeout(() => {
                style1.backgroundColor = SORT_COLOR;
                style2.backgroundColor = SORT_COLOR;
            }, i * 3 + 2);
        }
        this.completeSort(animations);
    }

    quickSort() {
        const animations = algo.getQuickSortAnimations(this.state.array);
        for (let i = 0; i < animations.length; i++) {
            const arrayBars = document.getElementsByClassName('array-bar');
            const [idx, r, partitionIdx, nH1, nH2, swap, endPartition] = animations[i];
            const styleI = arrayBars[idx].style;
            const styleR = arrayBars[r].style;
            const styleP = arrayBars[partitionIdx].style;
            setTimeout(() => {
                styleI.backgroundColor = TEMP_COLOR;
                styleR.backgroundColor = 'magenta';
                styleP.backgroundColor = TEMP_COLOR;
            }, i * 3);
            setTimeout(() => {
                if (swap) {
                    styleI.height = `${nH2}px`;
                    styleP.height = `${nH1}px`;
                }
            }, i * 3 + 1);
            setTimeout(() => {
                styleI.backgroundColor = SORT_COLOR;
                styleR.backgroundColor = SORT_COLOR;
                styleP.backgroundColor = SORT_COLOR;
            }, i * 3 + 2);
        }
        this.completeSort(animations);
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
                style1.backgroundColor = TEMP_COLOR;
                style2.backgroundColor = TEMP_COLOR;
            }, i * 3);
            setTimeout(() => {
                if (swap) {
                    style1.height = `${nH2}px`;
                    style2.height = `${nH1}px`;
                }
            }, i * 3 + 1);
            setTimeout(() => {
                if (last){    
                    style1.backgroundColor = UNSORTED_COLOR;
                    style2.backgroundColor = SORT_COLOR;
                }
                else {
                    style1.backgroundColor = UNSORTED_COLOR;
                    style2.backgroundColor = UNSORTED_COLOR;
                }
            }, i * 3 + 2);
        }
        this.completeSort(animations);
    }

    selectionSort() {
        const animations = algo.getSelectionSortAnimations(this.state.array);
        for (let i = 0; i < animations.length; i++) {
            const arrayBars = document.getElementsByClassName('array-bar');
            const [i1, i2, nH1, nH2, swap] = animations[i];
            const style1 = arrayBars[i1].style;
            const style2 = arrayBars[i2].style;
            setTimeout(() => {
                style1.backgroundColor = TEMP_COLOR;
                style2.backgroundColor = TEMP_COLOR;
            }, i * 3);
            setTimeout(() => {
                if (swap) {
                    style1.height = `${nH2}px`;
                    style2.height = `${nH1}px`;
                }
            }, i * 3 + 1);
            setTimeout(() => {
                if (swap) {
                    style1.backgroundColor = SORT_COLOR;
                    if (i1 !== i2) {
                        style2.backgroundColor = UNSORTED_COLOR;
                    }
                }
                else {
                    style1.backgroundColor = UNSORTED_COLOR;
                    style2.backgroundColor = UNSORTED_COLOR;
                }
            }, i * 3 + 2);
        }
        this.completeSort(animations);
    }

    insertionSort() {
        const animations = algo.getInsertionSortAnimations(this.state.array);
        for (let i = 0; i < animations.length; i++) {
            const arrayBars = document.getElementsByClassName('array-bar');
            const [i1, i2, nH1, nH2] = animations[i];
            const style1 = arrayBars[i1].style;
            const style2 = arrayBars[i2].style;
            setTimeout(() => {
                style1.backgroundColor = TEMP_COLOR;
                style2.backgroundColor = TEMP_COLOR;
            }, i * 3);
            setTimeout(() => {
                style1.height = `${nH2}px`;
                style2.height = `${nH1}px`;
            }, i * 3 + 1);
            setTimeout(() => {
                style1.backgroundColor = SORT_COLOR;
                style2.backgroundColor = SORT_COLOR;
            }, i * 3 + 2);
        }
        this.completeSort(animations);
    }

    render() {
        const {array} = this.state;

        return (
            <div body>
                <div className='array-container'>
                    {array.map((value, idx) => (
                        <div className="array-bar" key={idx} style={{backgroundColor: UNSORTED_COLOR, height: `${value}px`}}>
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
                        <button onClick={() => this.insertionSort()}>Insertion Sort</button>
                    </div>
                </nav>
            </div>
        );
    }
}

function randomIntFromIntervals(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}