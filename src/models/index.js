import User from "./User.js";
import Profile from "./Profile.js";
import Article from "./Article.js";
import Tag from "./Tag.js";
import ArticleTag from "./ArticleTag.js";

// User ↔ Profile (1:1)
User.hasOne(Profile, { as: "profile", foreignKey: "user_id" });
Profile.belongsTo(User, { as: "user", foreignKey: "user_id" });

// User ↔ Article (1:N)
User.hasMany(Article, { as: "articles", foreignKey: "user_id" });
Article.belongsTo(User, { as: "author", foreignKey: "user_id" });

// Article ↔ Tag (N:M)
Article.belongsToMany(Tag, {
  through: ArticleTag,
  as: "tags",
  foreignKey: "article_id",
});
Tag.belongsToMany(Article, {
  through: ArticleTag,
  as: "articles",
  foreignKey: "tag_id",
});

export { User, Profile, Article, Tag, ArticleTag };
