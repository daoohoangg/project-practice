<template>
  <table>
    <thead>
      <tr>
        <th>ID</th><th>Name</th><th>Weight</th><th>Type</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="pet in pets" :key="pet.id">
        <td>{{ pet.id }}</td>
        <td>{{ pet.name }}</td>
        <td>{{ pet.weight }}</td>
        <td>{{ pet.type }}</td>
      </tr>
    </tbody>
  </table>
</template>

<script lang="ts" setup>
import { ref, onMounted } from "vue";
import { getPetsApi  } from "../api/petApi";

interface Pet {
  id: number;
  name: string;
  weight: number;
  type: string;
}
const pets = ref<Pet[]>([]);
async function loadPets() {
  pets.value = await getPetsApi();
}
onMounted(loadPets);
</script>
<style scoped>
table {
  width: 60%;
  border-collapse: collapse;
  margin-top: 10px;
  font-size: 14px;
  margin: 30px auto;
}
table th,
table td {
  border: 1px solid #ddd;
  padding: 8px 12px;
  text-align: left;
}
table th {
  background: #f1f1f1;
  font-weight: 600;
}
table tr:nth-child(even) {
  background: #fafafa;
}
</style>