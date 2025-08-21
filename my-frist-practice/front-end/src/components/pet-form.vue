<template>
  <div class="container">
    <h1>Pet Store Inventory</h1>

    <!-- Form -->
    <form class="form" @submit.prevent="addPet">
      <label>
        Name:
        <input v-model="newPet.name" type="text" required />
      </label>

      <label>
        Weight (kg):
        <input v-model.number="newPet.weight" type="number" step="0.01" required />
      </label>

      <label>
        Type:
        <select v-model="newPet.type" required>
          <option value="">-- Select --</option>
          <option value="Dog">Dog</option>
          <option value="Cat">Cat</option>
          <option value="Bird">Bird</option>
        </select>
      </label>

      <button type="submit">Add Pet</button>
    </form>

    <!-- Summary -->
    <div class="summary">
      <div class="card">Total Pets: <b>{{ pets.length }}</b></div>
      <div class="card">Avg Weight: <b>{{ avgWeight.toFixed(2) }} kg</b></div>
      <div class="card">Dogs: <b>{{ countByType("Dog") }}</b></div>
      <div class="card">Cats: <b>{{ countByType("Cat") }}</b></div>
      <div class="card">Birds: <b>{{ countByType("Bird") }}</b></div>
    </div>

  </div>
</template>

<script lang="ts" setup>
import { ref, computed, onMounted } from "vue";
import { getPetsApi, addPetApi } from "../api/petApi";

interface Pet {
  id: number;
  name: string;
  weight: number;
  type: string;
}

const pets = ref<Pet[]>([]);
const newPet = ref({ name: "", weight: 0, type: "" });

async function loadPets() {
  pets.value = await getPetsApi();
}

async function addPet() {
  if (!newPet.value.name || !newPet.value.type) return;
  const pet = await addPetApi(newPet.value);
  pets.value.push(pet);
  newPet.value = { name: "", weight: 0, type: "" };
}

function countByType(type: string) {
  return pets.value.filter((p) => p.type === type).length;
}

const avgWeight = computed(() => {
  if (pets.value.length === 0) return 0;
  return pets.value.reduce((sum, p) => sum + p.weight, 0) / pets.value.length;
});

onMounted(loadPets);
</script>

<style scoped>
body {
  font-family: Arial, sans-serif;
  background: #f8f9fa;
}

.container {
  max-width: 700px;
  margin: 30px auto;
  padding: 20px;
  background: #fff;
  border: 1px solid #ddd;
  border-radius: 6px;
  box-shadow: 0 2px 6px rgba(0,0,0,0.1);
}

h1 {
  font-weight: bold;
  margin-bottom: 20px;
  text-align: center;
}

/* Form */
.form {
  margin-bottom: 20px;
}
.form label {
  display: block;
  margin-bottom: 12px;
  font-weight: 500;
}
.form input,
.form select {
  width: 100%;
  padding: 8px 10px;
  margin-top: 4px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 14px;
}
.form button {
  display: inline-block;
  margin-top: 8px;
  padding: 8px 14px;
  border: none;
  border-radius: 4px;
  background: #007bff;
  color: white;
  font-size: 14px;
  cursor: pointer;
  transition: background 0.3s;
}
.form button:hover {
  background: #0056b3;
}

/* Summary */
.summary {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
  gap: 10px;
  margin-bottom: 20px;
}
.card {
  padding: 10px;
  background: #f1f9ff;
  border: 1px solid #cce5ff;
  border-radius: 4px;
  text-align: center;
  font-size: 14px;
}

</style>
