<template>
  <section class="toy-edit-container">
    <h3>{{ title }}</h3>
    <form @submit.prevent="save" class="edit-form flex column">
      <div class="flex column">
        <label for="toy-name">Toy Name:</label>
        <el-input
          type="text"
          name="toy-name"
          placeholder="Toy name"
          v-model="toyForEdit.name"
          size="small"
          clearable
        ></el-input>
      </div>

      <div class="flex column">
        <label for="toy-price">Price:</label>
        <el-input-number
          name="toy-price"
          :step="5"
          v-model="toyForEdit.price"
          size="small"
        ></el-input-number>
      </div>

      <div class="flex column">
        <label for="toy-type">Type:</label>
        <el-select
          name="type"
          class="input-item"
          size="small"
          v-model="toyForEdit.type"
        >
          <el-option
            v-for="item in typeOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </div>

      <el-button type="primary" @click="save">Save</el-button>
    </form>
  </section>
</template>

<script>
import { toyService } from '../services/toy.service.js';

export default {
  name: 'toyEdit',
  components: {},
  data() {
    return {
      toyForEdit: {
        name: '',
        price: 0,
        type: '',
        createdAt: Date.now(),
        inStock: true,
      },
      typeOptions: [
        { value: 'funny', label: 'Funny' },
        { value: 'educational', label: 'Educational' },
        { value: 'adult', label: 'Adult' },
        { value: 'other', label: 'Other' },
      ],
    };
  },
  computed: {
    title() {
      return this.toyId ? 'Edit Toy' : 'Add Toy';
    },
    toyId() {
      return this.$route.params.toyId;
    },
  },
  methods: {
    async save() {
      try {
        await this.$store.dispatch({ type: 'saveToy', toy: this.toyForEdit });
        console.log('await was over');
        this.$store.dispatch('loadToys');
        // showMsg('Todo was saved!')
        this.$router.push('/toy');
      } catch (err) {
        console.log('error', err);
        // showMsg('Cannot save todo', 'danger');
      }
    },

    async getToyForEdit() {
      try {
        if (this.toyId) {
          const toy = await toyService.getById(this.toyId);
          console.log('get toy in toyEdit:',toy);
          this.toyForEdit = JSON.parse(JSON.stringify(toy));
        } else {
          this.toyForEdit = toyService.getEmpty();
          console.log('get empty toy in toyEdit:',this.toyForEdit);
        }
      } catch (err) {
        console.log('error in created toyTo Edit', err);
      }
    },
  },

  created() {
    this.getToyForEdit();
  },
};
</script>
