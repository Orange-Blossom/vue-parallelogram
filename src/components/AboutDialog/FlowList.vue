<template>
    <!-- Part of AboutDialog component, used to describe steps to follow when working with the program. -->
    <!-- TODO: use constants for text strings-->
    <v-card-text>
        <div class="font-weight-bold ms-1 mb-2">Flow</div>

        <v-timeline align="start" density="compact">
            <v-timeline-item :dot-color="'green'" size="x-small">
                <div class="mb-4">
                    <div class="font-weight-normal">
                        <strong>Step 1</strong>
                    </div>
                    <div>
                        Click anywhere on the screen to select 3 points. As you click
                        a red dot should appear to mark a new point
                    </div>
                </div>
            </v-timeline-item>
            <v-timeline-item :dot-color="'green'" size="x-small">
                <div class="mb-4">
                    <div class="font-weight-normal">
                        <strong>Step 2</strong>
                    </div>
                    <div>
                        Once you've done so, 4th point will be calculated. Then a
                        parallelogram and a circle will appear
                    </div>
                </div>
            </v-timeline-item>
            <v-timeline-item :dot-color="'green'" size="x-small">
                <div class="mb-4">
                    <div class="font-weight-normal">
                        <strong>Step 3</strong>
                    </div>
                    <div>
                        You can drag any point around to change the shape
                    </div>
                </div>
            </v-timeline-item>
        </v-timeline>
    </v-card-text>
</template>