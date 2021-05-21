Vue.component("product-details", {
  props: {
    details: {
      type: String,
      required: true,
      default: "books",
    },
  },
  template: `<div class="product-details">
              {{details}}
              <button v-on:click="emitRemoveEvent"> Remove product</button>
              <div>
        <p v-if="!reviews.length">There are no reviews yet.</p>
        <ul v-else>
            <li v-for="(review, index) in reviews" :key="index">
              <p>Name: {{ review.name }}</p>
              <p>Rating: {{ review.rating }}</p>
              <p>Review: {{ review.review }}</p>
            </li>
        </ul>
    </div>
   
   <product-review @review-submitted="addReview"></product-review>
            </div>
            
  `,
  data() {
    return {
      selectedBookId: 0,
      reviews: [],
    };
  },
  methods: {
    emitRemoveEvent: function () {
      this.$emit("emit-event", this.selectedBookId);
    },
    addReview(productReview) {
      this.reviews.push(productReview);
    },
  },
});

Vue.component("product-review", {
  // form + v-model
  template: `
    <form class="review-form" @submit.prevent="onSubmit">
    
      <p class="error" v-if="errors.length">
        <b>Please correct the following error(s):</b>
        <ul>
          <li v-for="error in errors">{{ error }}</li>
        </ul>
      </p>

      <p>
        <label for="name">Name:</label>
        <input id="name" v-model="name">
      </p>
      
      <p>
        <label for="review">Review:</label>      
        <textarea id="review" v-model="review"></textarea>
      </p>
      
      <p>
        <label for="rating">Rating:</label>
        <select id="rating" v-model.number="rating">
          <option>5</option>
          <option>4</option>
          <option>3</option>
          <option>2</option>
          <option>1</option>
        </select>
      </p>
      <label> Would you recommend this product ? </label>
      <p>
      <input type="radio" v-model="radio" value="yes" name="yes_no">Yes</input>
      </p>
      <p>
      <input type="radio" v-model="radio" value="no" name="yes_no">No</input>
      </p>
      
      <p>
      <button type="submit" >Submit</button>
      </p>    
    
  </form>
  `,
  data() {
    return {
      name: null,
      review: null,
      rating: null,
      radio: null,
      errors: [],
    };
  },
  methods: {
    onSubmit() {
      this.errors = [];
      if (this.name && this.review && this.rating && this.radio) {
        let productReview = {
          name: this.name,
          review: this.review,
          rating: this.rating,
          radio: this.radio,
        };
        this.$emit("review-submitted", productReview);
        this.name = null;
        this.review = null;
        this.rating = null;
        this.radio = null;
      } else {
        if (!this.name) this.errors.push("Name required.");
        if (!this.review) this.errors.push("Review required.");
        if (!this.rating) this.errors.push("Rating required.");
        if (!this.radio) this.errors.push("Recommend required.");
      }
    },
  },
});
var app = new Vue({
  el: "#app",
  data: {
    brand: "Enlightenment Books",
    product: "Chí Tôn Ca",
    description: "Hơi thở từ trời, bài ca giác ngộ !",
    image: "images/bhagavad-gita_vietnamok.jpg",
    onSale: true,
    cart: 0,
    inStock: false,
    activeClass: "active",

    books: [
      {
        bookId: 1,
        Name: "Chí Tôn Ca",
        bookImage: "images/bhagavad-gita_vietnamok.jpg",
        bookColor: "yellow",
      },
      {
        bookId: 2,
        Name: "Kỳ thư Kybalion",
        bookImage: "images/kybalion.jpg",
        bookColor: "green",
      },
      {
        bookId: 3,
        Name: "Bát Nhã Tâm Kinh",
        bookImage: "images/batnhatamkinh.jpg",
        bookColor: "blue",
      },
    ],
  },
  methods: {
    addToCart() {
      this.cart += 1;
    },
    removeFromCart() {
      if (this.cart > 0) {
        this.cart -= 1;
      }
    },
    removeItem(e) {
      this.books.splice(e, 1);
    },
    updateProduct(bookImage) {
      this.image = bookImage;
    },
  },

  computed: {
    title() {
      if (this.onSale) {
        return this.brand + " " + this.product;
      }
    },
  },
});
