<script setup>
	import { ref } from 'vue'
	import About from './components/AboutDialog/AboutDialog.vue'
	import InfoBox from './components/InfoBox.vue'
	import ResetButton from './components/ResetButton.vue'
	import { calculateFourthCorner, calculateParallelogramArea } from './services/CalculationsService'

	const dots = ref([])
	const isShapeComplete = ref(false)
	const centre = ref(null)
	const radius = ref(0)
	const area = ref(0)
	const isDragging = ref(false)
	const selectedDot = ref(null)

	// handle adding new corner
	function addCorner(event) {
		// shouldn't allow more than 4 dots as these are corners of parallelogram
		if (dots.value.length === 4) {
			return
		}

		// calculate dot's coordinates on the canvas
		const svg = document.getElementsByClassName('container')[0]
		const svgRect = svg.getBoundingClientRect()
		const offsetX = Math.round(event.clientX - svgRect.left)
		const offsetY = Math.round(event.clientY - svgRect.top)

		// save new dot
		dots.value.push({
			id: dots.value.length + 1,
			x: offsetX,
			y: offsetY,
			width: 11,
			height: 11
		})

		// once user chooses 3 dots manually, 4 dot is calculated
		if(dots.value.length === 3) {
			const p4 = calculateFourthCorner(dots, centre)
			if (!p4) {
				handleReset()
				return
			}

			// save 4th dot and complete calculations (area and circle radius)
			dots.value.push({ id: 4, ...p4, width: 11, height: 11 })
			isShapeComplete.value = true
			area.value = calculateParallelogramArea(dots.value)
			radius.value = Math.ceil(Math.sqrt(area.value/3.14))
		}
	}

	// handle reset action
	function handleReset() {
		dots.value = []
		isShapeComplete.value = false
		area.value = null
	}

	// initiate dragging a dot
	function handleMouseDown(event, dot) {
		isDragging.value = true
		selectedDot.value = dot
	}
	function handleMouseMove(event) {
		if (isDragging.value) {
			const svg = document.getElementsByClassName('container')[0]
			const svgRect = svg.getBoundingClientRect()
			const offsetX = Math.round(event.clientX - svgRect.left)
			const offsetY = Math.round(event.clientY - svgRect.top)
			console.log(`dragging ${selectedDot.id}, clientX: `, event.clientX)
			selectedDot.value.x = offsetX
			selectedDot.value.y = offsetY
		}
	}
	// finish dragging a dot
	function handleMouseUp() {
		isDragging.value = false
		selectedDot.value = null
	}
</script>

<template>
	<!-- Drawing area -->
	<svg class="container" @click="addCorner" @mouseup="handleMouseUp" @mousemove="event => handleMouseMove(event)" >
		<!-- Lines connecting the dots/corners -->
		<line v-if="isShapeComplete" v-for="(dot, index) in dots" :key="dot.id" :x1="dot.x" :y1="dot.y" :x2="dots[(index + 1) % 4].x" :y2="dots[(index + 1) % 4].y" stroke="blue" />
		<!-- Dots/corners of parallelogram -->
		<circle
			draggable="true"
			@mousedown="event => handleMouseDown(event, dot)"
			v-for="(dot, index) in dots"
			:key="'dot-' + index"
			:cx="dot.x"
			:cy="dot.y"
			r="5.5"
			fill="red"
		/>
		<!-- Circle with area and centre of mass same as parallelogram -->
		<circle v-if="isShapeComplete" :cx="centre.x" :cy="centre.y" :r="radius" stroke="yellow" fill="none" />
	</svg>

	<InfoBox :coordinates="dots" :area="area" />
	<About />
	<ResetButton :handle-reset="handleReset" />
</template>

<style scoped>
	.container {
		width: 50%;
		height: inherit;
		background-color: white;
	}
	circle:hover {
		cursor: grab;
	}
</style>
