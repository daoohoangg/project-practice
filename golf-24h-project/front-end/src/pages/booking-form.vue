<template>
  <div class="form-container">
    <h3>預約表單</h3>
    <form @submit.prevent="submitForm">
      <label>姓名：</label>
      <input type="text" v-model="form.name" required />

      <label>電話：</label>
      <input type="tel" v-model="form.phone" required />

      <label>Email：</label>
      <input type="email" v-model="form.email" required />

      <button type="submit">提交</button>
    </form>
  </div>
</template>

<script>
export default {
  name: "BookingForm",
  data() {
    return {
      form: {
        name: "",
        phone: "",
        email: "",
      },
    };
  },
  methods: {
    submitForm() {
      this.$emit("booking-submitted", this.form);
    },
  },
};
</script>

<style scoped>
.form-container {
  background: #fff;
  padding: 16px;
  border-radius: 8px;
  margin-top: 20px;
}

form {
  display: flex;
  flex-direction: column;
}

label {
  margin-top: 10px;
  margin-bottom: 4px;
  font-weight: bold;
}

input {
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 6px;
}

button {
  margin-top: 16px;
  padding: 10px;
  border: none;
  background: #f37021;
  color: white;
  border-radius: 6px;
  cursor: pointer;
  font-weight: bold;
}
</style>
