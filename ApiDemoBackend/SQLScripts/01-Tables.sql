use demo_react
go

create table products_brands
(
	id bigint identity
		constraint products_brands_pk
			primary key nonclustered,
	brand_name nvarchar(255) default 'BRAND_NAME' not null,
	row_version timestamp not null
)
go

create unique index products_brands_id_uindex
	on products_brands (id)
go

use demo_react
go

create table products_categories
(
	id bigint identity
		constraint products_categories_pk
			primary key nonclustered,
	category_name nvarchar(255) default 'CATEGORY_NAME' not null,
	row_version timestamp not null
)
go

create unique index products_categories_id_uindex
	on products_categories (id)
go


use demo_react
go

create table products
(
	id bigint identity
		constraint products_pk
			primary key nonclustered,
	product_name nvarchar(255) default 'PRODUCT_NAME' not null,
	brand_id bigint not null
		constraint products_products_brands_id_fk
			references products_brands
				on update cascade on delete cascade,
	category_id bigint not null
		constraint products_products_categories_id_fk
			references products_categories
				on update cascade on delete cascade,
	list_price numeric(10,2) default 0.00 not null,
	row_version timestamp not null
)
go

create unique index products_id_uindex
	on products (id)
go

create index products_brand_id_index
	on products (brand_id)
go

create index products_category_id_index
	on products (category_id)
go

use demo_react
go

create table email_queue
(
	id bigint identity
		constraint email_queue_pk
			primary key nonclustered,
	account nvarchar(100) not null,
	email nvarchar(100) default 'NO EMAIL' not null,
	ip nvarchar(50) default '0.0.0.0' not null,
	subject nvarchar(100) default 'NO SUBJECT' not null,
	content_html nvarchar(max) default 'NO CONTENT' not null,
	status smallint default 0 not null,
	requested_on datetime default getdate() not null,
	updated_on datetime default getdate() not null,
	row_version timestamp not null
)
go

create unique index email_queue_id_uindex
	on email_queue (id)
go

