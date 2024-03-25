<script setup>
    import { defineProps } from 'vue'

    const { coordinates, area } = defineProps(['coordinates', 'area'])
</script>

<template v-slot:default="{ coordinates }">
    <!-- Information box shows corrdinates of dots/corners and parallelogram's/circle's area -->
    <v-row class="infobox">
        <v-col cols="12" sm="12" xl="6">
            <v-sheet border>
                <v-list-item density="comfortable">
                    <template v-slot:title>
                        <strong class="text-h6"> Coordinates </strong>
                    </template>
                </v-list-item>

                <v-table class="text-caption" density="compact">
                    <tbody>
                        <tr v-for="coordinate in coordinates" :key="coordinate.id" align="right">
                            <th>{{ `Corner ${coordinate.id}:` }}</th>

                            <td>{{ `${coordinate.x},${coordinate.y}` }}</td>
                        </tr>
                        <tr v-if="area" :key="area" align="right">
                            <th>Area: </th>

                            <td>{{ area }}</td>
                        </tr>
                    </tbody>
                </v-table>
            </v-sheet>
        </v-col>
    </v-row>
</template>

<style scoped>
    .infobox {
        position: absolute;
        left: 100px;
        top: 100px;
    }

    ul {
        padding: 0;
        margin: 0;
        list-style: none;
    }
</style>
