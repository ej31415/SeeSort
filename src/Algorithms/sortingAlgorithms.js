function swap(array, i1, i2) {
    let temp = array[i1];
    array[i1] = array[i2];
    array[i2] = temp;
}

export function getMergeSortAnimations(array) {
    const animations = [];
    if (array.length <= 1) {
        return array;
    }
    const tempArray = array.slice();
    mergeSortHelper(array, 0, array.length - 1, tempArray, animations);
    return animations;
}

function mergeSortHelper(array, start, end, tempArray, animations) {
    if (start === end) {
        return;
    }
    const middle = Math.floor((start + end) / 2);
    mergeSortHelper(tempArray, start, middle, array, animations);
    mergeSortHelper(tempArray, middle + 1, end, array, animations);
    merge(array, start, middle, end, tempArray, animations);
}

function merge(array, start, middle, end, tempArray, animations) {
    let i = start;
    let j = middle + 1;
    let k = start;
    while (i <= middle && j <= end) {
        if (tempArray[i] < tempArray[j]) {
            animations.push([k, i, j, tempArray[i]]);
            array[k] = tempArray[i];
            i++;
            k++;
        }
        else {
            animations.push([k, j, i, tempArray[j]]);
            array[k] = tempArray[j];
            j++;
            k++;
        }
    }
    while (i <= middle) {
        animations.push([k, i, i, tempArray[i]]);
        array[k] = tempArray[i];
        i++;
        k++;
    }
    while (j <= end) {
        animations.push([k, j, j, tempArray[j]]);
        array[k] = tempArray[j];
        j++;
        k++;
    }
}

export function getQuickSortAnimations(array) {
    let animations = [];
    quickSortHelper(array, 0, array.length - 1, animations);
    return animations;
}

function quickSortHelper(array, l, r, animations) {
    if (l > r) {
        return;
    }
    let partitionIdx = partition(array, l, r, animations);
    quickSortHelper(array, l, partitionIdx - 1, animations);
    quickSortHelper(array, partitionIdx + 1, r, animations);
}

function partition(array, l, r, animations) {
    let partitionVal = array[r];
    let partitionIdx = l;
    for (let i = l; i < r; i++) {
        let change = false;
        if (array[i] < partitionVal) {
            swap(array, i, partitionIdx);
            partitionIdx++;
            change = true;
        }
        animations.push([i, r, partitionIdx, array[i], array[partitionIdx], change]);
    }
    swap(array, r, partitionIdx);
    animations.push([r, r, partitionIdx, partitionVal, array[partitionIdx], true]);
    return partitionIdx;
}

export function getHeapSortAnimations(array) {
    const animations = [];
    buildMaxHeap(array, animations);
    heapSortHelper(array, animations);
    return animations;
}

function heapify(array, i, r, animations) {
    let idx = i;
    while (2 * idx + 1 < r) {
        let c1 = array[2 * idx + 1];
        let c2 = (2 * idx + 2 < r) ? array[2 * idx + 2] : Number.MIN_SAFE_INTEGER;
        if (c1 > c2 && c1 > array[idx]) {
            animations.push([idx, 2*idx+1, array[idx], array[2*idx+1]]);
            swap(array, idx, 2 * idx + 1);
            idx = 2 * idx + 1;
        }
        else if (c2 >= c1 && c2 > array[idx]) {
            animations.push([idx, 2*idx+2, array[idx], array[2*idx+2]]);
            swap(array, idx, 2 * idx + 2);
            idx = 2 * idx + 2;
        }
        else {
            return;
        }
    }
}

function buildMaxHeap(array, animations) {
    let lastLeafIdx = Math.floor(array.length / 2 - 1);
    for (let i = lastLeafIdx; i > -1; i--) {
        heapify(array, i, array.length, animations);
    }
}

function heapSortHelper(array, animations) {
    let idx = array.length - 1;
    while (idx > -1) {
        animations.push([idx, 0, array[idx], array[0]]);
        swap(array, idx, 0);
        heapify(array, 0, idx, animations);
        idx--;
    }
}

export function getBubbleSortAnimations(array) {
    return bubbleSortHelper(array);
}

function bubbleSortHelper(array) {
    const animations = [];
    for (let i = 0; i < array.length - 1; i++) {
        for (let j = 0; j < array.length - 1 - i; j++) {
            let animation = [j, j + 1, array[j], array[j + 1]];
            let change = false;
            if (array[j] > array[j + 1]) {
                swap(array, j, j + 1);
                change = true;
            }
            animation.push(change);
            animation.push(false);
            animations.push(animation);
            console.log(animation);
        }
        animations[animations.length - 1][5] = true;
    }
    return animations;
}

export function getSelectionSortAnimations(array) {
    return selectionSortHelper(array);
}

function selectionSortHelper(array) {
    const animations = [];
    for (let i = 0; i < array.length; i++) {
        let minI = i;
        for (let j = i; j < array.length; j++) {
            if (array[j] < array[minI]) {
                minI = j;
            }
            animations.push([i, j, array[i], array[minI], false]);
        }
        animations.push([i, minI, array[i], array[minI], true]);
        swap(array, i, minI);
    }
    return animations;
}

export function getInsertionSortAnimations(array) {
    return insertionSortHelper(array);
}

function insertionSortHelper(array) {
    const animations = [];
    for (let i = 1; i < array.length; i++) {
        let j = i;
        while (j > 0 && array[j] < array[j - 1]) {
            animations.push([j, j - 1, array[j], array[j - 1]]);
            swap(array, j, j - 1);
            j--;
        }
    }
    return animations;
}
