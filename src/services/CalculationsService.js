// calculate parallelogram's (and circle's) area based on dots/corners coordinates
export function calculateParallelogramArea(dots) {
    // Extract coordinates
    const [A, B, C] = dots

    // Calculate area using the formula
    const area = Math.abs((B.x - A.x) * (C.y - A.y) - (C.x - A.x) * (B.y - A.y))

    return area
}

// calculate 4th corner of parallelogram based on 3 existing dots/corners
// attempts is the max number of recursive calls for this function.
// It's used in checking if 4th point is out-of-bounds or not.
// Equals to 3 by default, since we have to check 3 corners recursively,
// until we find a suitable vector
export function calculateFourthCorner(dots, centre, attempts = 3) {
    if (attempts === 0) {
        alert('Cannot draw such a huge parallelogramm!')
        return
    }

    const corners = dots.value
    const svg = document.getElementsByClassName('container')[0];
    const svgRect = svg.getBoundingClientRect();

    // (re-)calculate centre of parallelogramm and circle
    centre.value = {
        x: (corners[0].x + corners[2].x)/2,
        y: (corners[0].y + corners[2].y)/2
    };
    // Calculate point D (fourth corner) by adding vector AB to point 3
    let pointD = {
        x: 2*centre.value.x - corners[1].x,
        y: 2*centre.value.y - corners[1].y
    };

    // check that calculated 4th point is within our canvas
    if (pointD.x < 0 || pointD.y < 0 || pointD.x > svgRect.width || pointD.y > svgRect.height) {
        // if not, then we'll calculate it with a different sequence of dots.
        // We change the order, in which the dots are coming, to find a vector for point D,
        // where it would lie within the bounds of ur canvas
        const resortedCorners = [corners[1], corners[2], corners[0]]
        dots.value = resortedCorners
        // recursively call the function again and reduce the number of attempts
        pointD = calculateFourthCorner(dots, centre, attempts - 1)
    }

    return pointD
}