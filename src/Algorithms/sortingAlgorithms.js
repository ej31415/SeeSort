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