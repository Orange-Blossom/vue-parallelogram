<script setup>
    import { ref } from 'vue'
    import FlowList from './FlowList.vue'

    // Define reactive variables
    let dialogVisible = ref(true)
    const author = 'Hanna Herasimuk'
</script>

<template>
    <!-- Dialog with general infos about the app, opens by default or later on About button click. -->
    <!-- TODO: use constants for text strings-->
    <div class="about-dialog text-center pa-4">
        <!-- Button to open the dialog -->
        <v-btn
            color="primary"
            icon="mdi-information"
            text="About"
            @click="dialogVisible = true"
        ></v-btn>

        <!-- Dialog component -->
        <v-dialog v-model="dialogVisible" width="auto">
            <v-card max-width="600" title="About">
                <!-- About content -->
                <v-card-item>
                    <v-card-subtitle>
                        Author: {{ author }}
                    </v-card-subtitle>
                </v-card-item>
                <v-card-text>
                    This program allows users to draw a parallelogram based on three points selected by the user. The fourth point is calculated automatically. These points then form the four corners of a parallelogram, which is drawn immediately.
                    Additionally, the program draws a circle with the same area and center of mass as the parallelogram. Click <v-btn class="tool-icon" color="primary" icon="mdi-restart" size="20px" text="Reset"></v-btn> to reset all changes. Click <v-btn class="tool-icon" color="primary" icon="mdi-information" size="20px" text="About"></v-btn> to read this info again.
                </v-card-text>
                <v-card-item>
                    <v-card-subtitle>
                        *See how the Coordinates window updates as you select new points
                    </v-card-subtitle>
                </v-card-item>

                <!-- FlowList component -->
                <FlowList />

                <!-- OK button, closes AboutDialog -->
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn
                        text
                        @click="dialogVisible = false"
                    >
                        OK
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </div>
</template>

<style scoped>
    .about-dialog {
        position: absolute;
        bottom: 50px;
        right: 100px;
    }
    .tool-icon {
        font-size: 10px;
    }
</style>