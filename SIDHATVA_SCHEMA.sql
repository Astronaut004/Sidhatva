CREATE TABLE users (
id BIGSERIAL PRIMARY KEY,
email VARCHAR(255) UNIQUE,
phone VARCHAR(20) UNIQUE,
password_hash VARCHAR(255),
email_verified BOOLEAN DEFAULT FALSE,
phone_verified BOOLEAN DEFAULT FALSE,
role VARCHAR(20) DEFAULT 'user' CHECK (role IN ('admin', 'user', 'vendor')),
status VARCHAR(20) DEFAULT 'active' CHECK (status IN ('active', 'inactive')),
is_active BOOLEAN DEFAULT TRUE,
created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
last_login_at TIMESTAMP,
last_purchase_date DATE,

login_attempts INT DEFAULT 0,
reward_points INT DEFAULT 0,
referral_code VARCHAR(50),
notes VARCHAR(255)
);


CREATE TABLE profiles (
id BIGSERIAL PRIMARY KEY,                         
user_id BIGINT NOT NULL REFERENCES users(id) ON DELETE CASCADE, 
first_name VARCHAR(100),                          
last_name VARCHAR(100),                           
full_name VARCHAR(201) GENERATED ALWAYS AS (first_name || ' ' || last_name) STORED, 
date_of_birth DATE,                          
gender VARCHAR(20) CHECK (gender IN ('male', 'female', 'other', 'prefer_not_to_say')),
avatar_url VARCHAR(500),                    
bio TEXT,                                      
preferences JSON,   
created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, 
updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP 
);


CREATE TABLE otps (
id BIGSERIAL PRIMARY KEY,
identifier VARCHAR(255) NOT NULL,
identifier_type VARCHAR(10) NOT NULL CHECK (identifier_type IN ('email', 'phone')),
otp_code VARCHAR(10) NOT NULL,
purpose VARCHAR(50) NOT NULL CHECK (purpose IN (
'registration',
'login',
'password_reset',
'phone_verification',
'email_verification'
)),
expires_at TIMESTAMP NOT NULL,
used_at TIMESTAMP,
attempts INT DEFAULT 0,
max_attempts INT DEFAULT 3,
is_used BOOLEAN DEFAULT FALSE,
created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);



CREATE TABLE addresses (
id BIGSERIAL PRIMARY KEY,
user_id BIGINT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
type VARCHAR(20) DEFAULT 'home' CHECK (type IN ('home', 'work', 'billing', 'shipping', 'other')),
label VARCHAR(100),
recipient_name VARCHAR(200),
recipient_phone VARCHAR(20),
address_line_1 VARCHAR(255) NOT NULL,
address_line_2 VARCHAR(255),
city VARCHAR(100) NOT NULL,
state VARCHAR(100) NOT NULL,
postal_code VARCHAR(20) NOT NULL,
country VARCHAR(100) DEFAULT 'India' NOT NULL,
landmark VARCHAR(255),
is_default BOOLEAN DEFAULT FALSE,
is_active BOOLEAN DEFAULT TRUE,
created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE product_categories  (
id BIGSERIAL PRIMARY KEY,
name VARCHAR(100) NOT NULL,
slug VARCHAR(120) UNIQUE NOT NULL,
description TEXT,
is_active BOOLEAN DEFAULT TRUE,
seo_title VARCHAR(200),
created_by BIGINT REFERENCES users(id) ON DELETE SET NULL,
created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


CREATE TABLE sub_categories (
id BIGSERIAL PRIMARY KEY,
category_id BIGINT NOT NULL REFERENCES product_categories(id) ON DELETE CASCADE,
name VARCHAR(100) NOT NULL,
slug VARCHAR(120) UNIQUE NOT NULL,
description TEXT,
is_active BOOLEAN DEFAULT TRUE,
seo_title VARCHAR(200),
created_by BIGINT REFERENCES users(id) ON DELETE SET NULL,
created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE brands (
id BIGSERIAL PRIMARY KEY,
name VARCHAR(100) UNIQUE NOT NULL,
slug VARCHAR(120) UNIQUE NOT NULL,
description TEXT,
logo_url VARCHAR(500),
website_url VARCHAR(500),
is_active BOOLEAN DEFAULT TRUE,
created_by BIGINT REFERENCES users(id) ON DELETE SET NULL,
created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE materials (
id BIGSERIAL PRIMARY KEY,
name VARCHAR(100) UNIQUE NOT NULL,
description TEXT,
properties JSON,  -- Material properties like durability, washable, etc.
is_active BOOLEAN DEFAULT TRUE,
created_by BIGINT REFERENCES users(id) ON DELETE SET NULL,
created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE colors (
id BIGSERIAL PRIMARY KEY,
name VARCHAR(50) UNIQUE NOT NULL,
hex_code VARCHAR(7),     -- #FFFFFF format
rgb_code VARCHAR(20),    -- rgb(255,255,255) format
is_active BOOLEAN DEFAULT TRUE,
created_by BIGINT REFERENCES users(id) ON DELETE SET NULL,
created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE products (
id BIGSERIAL PRIMARY KEY,
barcode VARCHAR(100) UNIQUE,
comp_code VARCHAR(50),
sku VARCHAR(100) UNIQUE NOT NULL,
name VARCHAR(255) NOT NULL,
slug VARCHAR(300) UNIQUE NOT NULL,
description TEXT,
short_description TEXT,
category_id BIGINT REFERENCES product_categories(id) ON DELETE CASCADE,
sub_category_id BIGINT REFERENCES sub_categories(id) ON DELETE CASCADE,
brand_id BIGINT REFERENCES brands(id) ON DELETE SET NULL,
material_id BIGINT REFERENCES materials(id) ON DELETE SET NULL,
color_id BIGINT REFERENCES colors(id) ON DELETE SET NULL,
type VARCHAR(20) DEFAULT 'simple' CHECK (type IN ('simple', 'variable', 'grouped', 'external')),
status VARCHAR(20) DEFAULT 'draft' CHECK (status IN ('draft', 'published', 'archived')),
is_active BOOLEAN DEFAULT TRUE,
visibility VARCHAR(20) DEFAULT 'visible' CHECK (visibility IN ('visible', 'hidden', 'catalog', 'search')),
featured BOOLEAN DEFAULT FALSE,
weight DECIMAL(10,3),
dimensions JSON,  -- {length, width, height}
shipping_required BOOLEAN DEFAULT TRUE,
tax_status VARCHAR(20) DEFAULT 'taxable' CHECK (tax_status IN ('taxable', 'shipping', 'none')),
manage_stock BOOLEAN DEFAULT TRUE,
stock_status VARCHAR(20) DEFAULT 'instock' CHECK (stock_status IN ('instock', 'outofstock', 'onbackorder')),
backorders_allowed BOOLEAN DEFAULT FALSE,
sold_individually BOOLEAN DEFAULT FALSE,
unit_factor DECIMAL(10,2) DEFAULT 1.0,
unit_code VARCHAR(20) DEFAULT 'pcs',
cost_price DECIMAL(12,2),
selling_price DECIMAL(12,2),
discount_amount DECIMAL(12,2) DEFAULT 0,
discount_percent DECIMAL(5,2) DEFAULT 0,
reviews_allowed BOOLEAN DEFAULT TRUE,
average_rating DECIMAL(3,2) DEFAULT 0.00,
rating_count INT DEFAULT 0,
total_sales INT DEFAULT 0,

seo_title VARCHAR(200),
seo_description TEXT,
created_by BIGINT REFERENCES users(id) ON DELETE SET NULL,
created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


CREATE TABLE product_variants (
id BIGSERIAL PRIMARY KEY,
product_id BIGINT NOT NULL REFERENCES products(id) ON DELETE CASCADE,
sku VARCHAR(100) UNIQUE NOT NULL,
name VARCHAR(255),
description TEXT,
price DECIMAL(12,2) NOT NULL,
cost_price DECIMAL(12,2),
discount_amount DECIMAL(12,2) DEFAULT 0,
discount_percent DECIMAL(5,2) DEFAULT 0,
weight DECIMAL(10,3),
dimensions JSON,  -- {length, width, height}

stock_quantity INT DEFAULT 0,
low_stock_threshold INT DEFAULT 5,
manage_stock BOOLEAN DEFAULT TRUE,
stock_status VARCHAR(20) DEFAULT 'instock' CHECK (stock_status IN ('instock', 'outofstock', 'onbackorder')),
backorders_allowed BOOLEAN DEFAULT FALSE,
is_active BOOLEAN DEFAULT TRUE,
unit_factor DECIMAL(10,2) DEFAULT 1.0,
unit_code VARCHAR(20) DEFAULT 'pcs',
attributes JSON,  -- Store variant-specific attributes like color_id, size, material_id
created_by BIGINT REFERENCES users(id) ON DELETE SET NULL,
created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE product_images (
id BIGSERIAL PRIMARY KEY,
product_id BIGINT NOT NULL REFERENCES products(id) ON DELETE CASCADE,
variant_id BIGINT REFERENCES product_variants(id) ON DELETE CASCADE,
image_url TEXT NOT NULL,
alt_text VARCHAR(255),
is_primary BOOLEAN DEFAULT FALSE,
is_active BOOLEAN DEFAULT TRUE,
image_type VARCHAR(50),
image_size BIGINT,
position INT DEFAULT 0,
created_by BIGINT REFERENCES users(id) ON DELETE SET NULL,
created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE scheme_master (
id BIGSERIAL PRIMARY KEY,
name VARCHAR(255) NOT NULL,
description TEXT,
type VARCHAR(20) NOT NULL CHECK (type IN ('percentage','fixed','buy_x_get_y','free_shipping')),
value DECIMAL(10,2),
conditions JSON,
applicable_to VARCHAR(50) NOT NULL,
min_order_amount DECIMAL(10,2),
max_discount_amount DECIMAL(10,2),
usage_limit INT,
usage_limit_per_user INT,
current_usage INT DEFAULT 0,
valid_from TIMESTAMP NOT NULL,
valid_to TIMESTAMP NOT NULL,
is_active BOOLEAN DEFAULT TRUE,
created_by BIGINT REFERENCES users(id) ON DELETE SET NULL,
created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


CREATE TABLE taxes (
id BIGSERIAL PRIMARY KEY,
name VARCHAR(100) NOT NULL,
description TEXT,
rate DECIMAL(4,2) NOT NULL,
type VARCHAR(20) DEFAULT 'exclusive' CHECK (type IN ('inclusive','exclusive')),
applicable_to VARCHAR(20) DEFAULT 'all' CHECK (applicable_to IN ('all','categories','products')),
category_id BIGINT REFERENCES product_categories(id) ON DELETE CASCADE,
product_id BIGINT REFERENCES products(id) ON DELETE CASCADE,
shipping_zone_id BIGINT REFERENCES shipping_zones(id) ON DELETE SET NULL,
is_active BOOLEAN DEFAULT TRUE,
created_by BIGINT REFERENCES users(id) ON DELETE SET NULL,
created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE shipping_zones (
id BIGSERIAL PRIMARY KEY,
name VARCHAR(100) NOT NULL,
description TEXT,
countries JSON NOT NULL,
states JSON,
postal_codes JSON,
is_active BOOLEAN DEFAULT TRUE,
created_by BIGINT REFERENCES users(id) ON DELETE SET NULL,
created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


CREATE TABLE carts (
id BIGSERIAL PRIMARY KEY,
user_id BIGINT REFERENCES users(id) ON DELETE CASCADE,
session_id VARCHAR(255),
subtotal DECIMAL(10,2) DEFAULT 0.00,
tax_amount DECIMAL(10,2) DEFAULT 0.00,
shipping_amount DECIMAL(10,2) DEFAULT 0.00,
discount_amount DECIMAL(10,2) DEFAULT 0.00,
total_amount DECIMAL(10,2) DEFAULT 0.00,
currency VARCHAR(3) DEFAULT 'INR',
expires_at TIMESTAMP,
is_active BOOLEAN DEFAULT TRUE,
created_by BIGINT REFERENCES users(id) ON DELETE CASCADE,
created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


CREATE TABLE cart_items (
id BIGSERIAL PRIMARY KEY,
cart_id BIGINT NOT NULL REFERENCES carts(id) ON DELETE CASCADE,
product_id BIGINT NOT NULL REFERENCES products(id) ON DELETE CASCADE,
variant_id BIGINT REFERENCES product_variants(id) ON DELETE CASCADE,
quantity INT NOT NULL DEFAULT 1,
unit_price DECIMAL(10,2) NOT NULL,
total_price DECIMAL(10,2) NOT NULL,
is_active BOOLEAN DEFAULT TRUE,
created_by BIGINT REFERENCES users(id) ON DELETE CASCADE,
created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
UNIQUE (cart_id, product_id, variant_id)
);

CREATE TABLE wishlists (
    id BIGSERIAL PRIMARY KEY,
    user_id BIGINT REFERENCES users(id) ON DELETE CASCADE,
    name VARCHAR(255) DEFAULT 'My Wishlist',
    is_public BOOLEAN DEFAULT FALSE,
    is_default BOOLEAN DEFAULT TRUE,
    is_active BOOLEAN DEFAULT TRUE,
    created_by BIGINT REFERENCES users(id), 
    guest_id UUID,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, 
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE wishlist_items (
    id BIGSERIAL PRIMARY KEY,
    wishlist_id BIGINT NOT NULL REFERENCES wishlists(id) ON DELETE CASCADE,
    product_id BIGINT NOT NULL REFERENCES products(id) ON DELETE CASCADE,
    variant_id BIGINT REFERENCES product_variants(id) ON DELETE CASCADE,
    is_active BOOLEAN DEFAULT TRUE,
    created_by BIGINT REFERENCES users(id), 
    guest_id UUID,                           
    added_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, 
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, 
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


CREATE TYPE order_status AS ENUM ('pending','confirmed','processing','shipped','delivered','cancelled','refunded','failed');
CREATE TYPE payment_status AS ENUM ('pending','paid','failed','refunded','partially_refunded');


CREATE TABLE orders (
id BIGSERIAL PRIMARY KEY,
order_number VARCHAR(50) UNIQUE NOT NULL,
user_id BIGINT REFERENCES users(id) ON DELETE SET NULL,
created_by BIGINT REFERENCES users(id) ON DELETE SET NULL,
status order_status DEFAULT 'pending',
payment_status payment_status DEFAULT 'pending',
payment_method VARCHAR(50),
billing_address_id BIGINT REFERENCES addresses(id) ON DELETE SET NULL,
shipping_address_id BIGINT REFERENCES addresses(id) ON DELETE SET NULL,
billing_first_name VARCHAR(100),
billing_last_name VARCHAR(100),
billing_type VARCHAR(100),
billing_id VARCHAR(255),
billing_address_2 VARCHAR(255),
billing_city VARCHAR(100),
billing_state VARCHAR(100),
billing_postal_code VARCHAR(20),
billing_country VARCHAR(100),
billing_phone VARCHAR(20),
billing_email VARCHAR(255),
shipping_first_name VARCHAR(100),
shipping_last_name VARCHAR(100),
shipping_company VARCHAR(100),
shipping_address_1 VARCHAR(255),
shipping_address_2 VARCHAR(255),
shipping_city VARCHAR(100),
shipping_state VARCHAR(100),
shipping_postal_code VARCHAR(20),
shipping_country VARCHAR(100),
shipping_phone VARCHAR(20),
subtotal DECIMAL(10,2) DEFAULT 0.00 NOT NULL,
tax_amount DECIMAL(10,2) DEFAULT 0.00,
shipping_amount DECIMAL(10,2) DEFAULT 0.00,
discount_amount DECIMAL(10,2) DEFAULT 0.00,
total_amount DECIMAL(10,2) DEFAULT 0.00 NOT NULL,
currency VARCHAR(3) DEFAULT 'INR',
notes TEXT,
customer_notes TEXT,
order_date TIMESTAMP DEFAULT now(),
shipped_date TIMESTAMP,
delivered_date TIMESTAMP,
created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
is_active BOOLEAN DEFAULT TRUE
);


CREATE TABLE order_items (
id BIGSERIAL PRIMARY KEY,
order_id BIGINT NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
product_id BIGINT REFERENCES products(id) ON DELETE SET NULL,
variant_id BIGINT REFERENCES product_variants(id) ON DELETE SET NULL,
product_name VARCHAR(255) NOT NULL,
product_sku VARCHAR(100) NOT NULL,
quantity INT NOT NULL,
unit_price DECIMAL(10,2) NOT NULL,
total_price DECIMAL(10,2) NOT NULL,
product_data JSON,
is_active BOOLEAN DEFAULT TRUE,
created_by BIGINT REFERENCES users(id) ON DELETE SET NULL,
guest_id UUID,
created_at TIMESTAMP WITHOUT TIME ZONE DEFAULT now(),
updated_at TIMESTAMP WITHOUT TIME ZONE DEFAULT now()
);

CREATE TYPE payment_method AS ENUM ('credit_card', 'debit_card', 'upi', 'net_banking', 'wallet', 'cod', 'emi');
CREATE TYPE payment_status_payment AS ENUM ('pending', 'processing', 'completed', 'failed', 'cancelled', 'refunded');

CREATE TABLE payments (
id BIGSERIAL PRIMARY KEY,
order_id BIGINT NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
payment_method payment_method NOT NULL,
payment_gateway VARCHAR(50),
transaction_id VARCHAR(255),
gateway_transaction_id VARCHAR(255),
amount DECIMAL(10,2) NOT NULL,
currency VARCHAR(3) DEFAULT 'INR',
status payment_status_payment DEFAULT 'pending',
gateway_response JSON,
failure_reason TEXT,
processed_at TIMESTAMP,
is_active BOOLEAN DEFAULT TRUE,
created_by BIGINT REFERENCES users(id) ON DELETE SET NULL,
created_at TIMESTAMP WITHOUT TIME ZONE DEFAULT now(),
updated_at TIMESTAMP WITHOUT TIME ZONE DEFAULT now()
);


CREATE TYPE shipment_status AS ENUM (
'pending', 'picked_up', 'in_transit', 'out_for_delivery', 'delivered', 'failed_delivery', 'returned', 'cancelled'
);

CREATE TYPE delivery_type AS ENUM (
'standard', 'express', 'same_day', 'scheduled'
);

CREATE TABLE shipments (
    id BIGSERIAL PRIMARY KEY,
    order_id BIGINT NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
    tracking_number VARCHAR(100) UNIQUE,
    carrier VARCHAR(100),
    carrier_service VARCHAR(100),
    shipped_from_address JSON,
    shipped_to_address JSON NOT NULL,
    weight DECIMAL(8,3),
    package_count INT DEFAULT 1,
    package_type VARCHAR(50),
    status shipment_status DEFAULT 'pending',
    delivery_type delivery_type DEFAULT 'standard',
    shipping_cost DECIMAL(10,2),
    estimated_delivery_date DATE,
    shipped_date TIMESTAMP,
    delivered_date TIMESTAMP,
    is_active BOOLEAN DEFAULT TRUE,
    created_by BIGINT REFERENCES users(id) ON DELETE SET NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TYPE transaction_type_enum AS ENUM (
'purchase', 'sale', 'adjustment', 'return', 'damage', 'transfer', 'manufacture'
);

CREATE TYPE reference_type_enum AS ENUM (
'order', 'return', 'adjustment', 'purchase_order', 'transfer', 'manual'
);

CREATE TYPE transaction_status_enum AS ENUM (
'pending', 'completed', 'cancelled', 'reversed'
);

CREATE TABLE stock_transactions (
id BIGSERIAL PRIMARY KEY,
product_id BIGINT NOT NULL REFERENCES products(id) ON DELETE CASCADE,
variant_id BIGINT REFERENCES product_variants(id) ON DELETE CASCADE,
transaction_type transaction_type_enum NOT NULL,
transaction_reason VARCHAR(255),
reference_type reference_type_enum,
reference_id BIGINT,
quantity_before INT NOT NULL DEFAULT 0,
quantity_change INT NOT NULL,
quantity_after INT NOT NULL DEFAULT 0,
unit_cost DECIMAL(10,2),
total_cost DECIMAL(10,2),
warehouse_location VARCHAR(100),
bin_location VARCHAR(50),
batch_number VARCHAR(100),
lot_number VARCHAR(100),
expiry_date DATE,
manufacture_date DATE,
performed_by BIGINT REFERENCES users(id) ON DELETE SET NULL,
notes TEXT,
automated BOOLEAN DEFAULT FALSE,
status transaction_status_enum DEFAULT 'completed',
is_active BOOLEAN DEFAULT TRUE,
created_by BIGINT REFERENCES users(id) ON DELETE SET NULL,
created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


CREATE TYPE invoice_type_enum AS ENUM ('invoice', 'proforma', 'credit_note', 'debit_note');
CREATE TYPE invoice_status_enum AS ENUM ('draft', 'sent', 'paid', 'overdue', 'cancelled', 'refunded');
CREATE TYPE recurring_frequency_enum AS ENUM ('weekly', 'monthly', 'quarterly', 'yearly');

CREATE TABLE invoices (
id BIGSERIAL PRIMARY KEY,
order_id BIGINT NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
invoice_number VARCHAR(50) UNIQUE NOT NULL,
type invoice_type_enum DEFAULT 'invoice',
status invoice_status_enum DEFAULT 'draft',
parent_invoice_id BIGINT REFERENCES invoices(id) ON DELETE SET NULL,
customer_name VARCHAR(200) NOT NULL,
customer_email VARCHAR(255),
customer_phone VARCHAR(20),
customer_tax_number VARCHAR(50),
billing_address JSON NOT NULL,
subtotal DECIMAL(10,2) NOT NULL DEFAULT 0.00,
tax_amount DECIMAL(10,2) DEFAULT 0.00,
shipping_amount DECIMAL(10,2) DEFAULT 0.00,
discount_amount DECIMAL(10,2) DEFAULT 0.00,
adjustment_amount DECIMAL(10,2) DEFAULT 0.00,
total_amount DECIMAL(10,2) NOT NULL DEFAULT 0.00,
paid_amount DECIMAL(10,2) DEFAULT 0.00,
balance_due DECIMAL(10,2) GENERATED ALWAYS AS (total_amount - paid_amount) STORED,
tax_breakdown JSON,
place_of_supply VARCHAR(100),
currency VARCHAR(3) DEFAULT 'INR',
exchange_rate DECIMAL(10,4) DEFAULT 1.0000,
payment_terms VARCHAR(255),
due_date DATE,
notes TEXT,
terms_and_conditions TEXT,
invoice_date DATE NOT NULL,
sent_date TIMESTAMP,
paid_date TIMESTAMP,
pdf_file_url VARCHAR(500),
is_recurring BOOLEAN DEFAULT FALSE,
recurring_frequency recurring_frequency_enum,
next_invoice_date DATE,
is_active BOOLEAN DEFAULT TRUE,
created_by BIGINT REFERENCES users(id) ON DELETE SET NULL,
created_at TIMESTAMP WITHOUT TIME ZONE DEFAULT now(),
updated_at TIMESTAMP WITHOUT TIME ZONE DEFAULT now()
);


CREATE TABLE invoice_items (
id BIGSERIAL PRIMARY KEY,
invoice_id BIGINT NOT NULL REFERENCES invoices(id) ON DELETE CASCADE,
product_id BIGINT REFERENCES products(id) ON DELETE SET NULL,
variant_id BIGINT REFERENCES product_variants(id) ON DELETE SET NULL,
item_name VARCHAR(255) NOT NULL,
item_description TEXT,
sku VARCHAR(100),
hsn_code VARCHAR(20),
quantity DECIMAL(10,3) NOT NULL DEFAULT 1 CHECK (quantity >= 0),
unit_price DECIMAL(10,2) NOT NULL CHECK (unit_price >= 0),
line_total DECIMAL(10,2) NOT NULL,
discount_amount DECIMAL(10,2) DEFAULT 0.00,
tax_rate DECIMAL(5,2) DEFAULT 0.00,
tax_amount DECIMAL(10,2) DEFAULT 0.00,
sort_order INT DEFAULT 0,
is_active BOOLEAN DEFAULT TRUE,
created_by BIGINT REFERENCES users(id) ON DELETE SET NULL,
created_at TIMESTAMP WITHOUT TIME ZONE DEFAULT now(),
updated_at TIMESTAMP WITHOUT TIME ZONE DEFAULT now()
);



CREATE TYPE return_type_enum AS ENUM ('return', 'exchange', 'refund');
CREATE TYPE return_reason_enum AS ENUM ('defective', 'wrong_item', 'not_as_described', 'damaged_in_shipping', 'no_longer_needed', 'size_issue', 'other');
CREATE TYPE return_status_enum AS ENUM ('requested', 'approved', 'rejected', 'pickup_scheduled', 'picked_up', 'received', 'inspected', 'processed', 'completed', 'cancelled');
CREATE TYPE who_pays_enum AS ENUM ('customer', 'merchant', 'split');
CREATE TYPE received_condition_enum AS ENUM ('new', 'used', 'damaged', 'defective', 'incomplete');
CREATE TYPE refund_method_enum AS ENUM ('original_payment', 'store_credit', 'bank_transfer', 'cash');

CREATE TABLE returns (
id BIGSERIAL PRIMARY KEY,
return_number VARCHAR(50) UNIQUE NOT NULL,
order_id BIGINT NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
customer_id BIGINT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
type return_type_enum DEFAULT 'return',
reason return_reason_enum NOT NULL,
detailed_reason TEXT,
status return_status_enum DEFAULT 'requested',
return_policy_days INT DEFAULT 30,
is_within_policy BOOLEAN DEFAULT TRUE,
total_return_amount DECIMAL(10,2) DEFAULT 0.00 CHECK (total_return_amount >= 0),
refund_amount DECIMAL(10,2) DEFAULT 0.00 CHECK (refund_amount >= 0),
restocking_fee DECIMAL(10,2) DEFAULT 0.00 CHECK (restocking_fee >= 0),
shipping_cost_refund DECIMAL(10,2) DEFAULT 0.00 CHECK (shipping_cost_refund >= 0),
return_shipping_method VARCHAR(100),
return_tracking_number VARCHAR(100),
return_shipping_cost DECIMAL(10,2) DEFAULT 0.00 CHECK (return_shipping_cost >= 0),
who_pays_return_shipping who_pays_enum DEFAULT 'customer',
received_condition received_condition_enum,
inspection_notes TEXT,
restockable BOOLEAN,
refund_method refund_method_enum,
refund_reference VARCHAR(255),
customer_comments TEXT,
return_address JSON,
requested_date TIMESTAMP DEFAULT now(),
approved_date TIMESTAMP,
pickup_scheduled_date TIMESTAMP,
picked_up_date TIMESTAMP,
received_date TIMESTAMP,
inspected_date TIMESTAMP,
processed_date TIMESTAMP,
completed_date TIMESTAMP,
approved_by BIGINT REFERENCES users(id) ON DELETE SET NULL,
processed_by BIGINT REFERENCES users(id) ON DELETE SET NULL,
images JSON,
is_prepaid_return BOOLEAN DEFAULT FALSE,
return_label_url VARCHAR(500),
is_active BOOLEAN DEFAULT TRUE,
created_by BIGINT REFERENCES users(id) ON DELETE SET NULL,
created_at TIMESTAMP WITHOUT TIME ZONE DEFAULT now(),
updated_at TIMESTAMP WITHOUT TIME ZONE DEFAULT now()
);


CREATE TYPE return_item_condition_enum AS ENUM ('new', 'used', 'damaged', 'defective', 'incomplete');

CREATE TABLE return_items (
id BIGSERIAL PRIMARY KEY,
return_id BIGINT NOT NULL REFERENCES returns(id) ON DELETE CASCADE,
order_item_id BIGINT NOT NULL REFERENCES order_items(id) ON DELETE CASCADE,
product_id BIGINT NOT NULL REFERENCES products(id) ON DELETE RESTRICT,
variant_id BIGINT REFERENCES product_variants(id) ON DELETE RESTRICT,
product_name VARCHAR(255) NOT NULL,
product_sku VARCHAR(100) NOT NULL,
quantity_ordered INT NOT NULL,
quantity_returned INT NOT NULL,
unit_price DECIMAL(10,2) NOT NULL,
total_price DECIMAL(10,2) NOT NULL,
condition_received return_item_condition_enum,
item_notes TEXT,
restockable BOOLEAN,
is_active BOOLEAN DEFAULT TRUE,
created_by BIGINT,
created_at TIMESTAMP WITHOUT TIME ZONE DEFAULT now(),
updated_at TIMESTAMP WITHOUT TIME ZONE DEFAULT now()
);

CREATE TABLE return_exchanges (
id BIGSERIAL PRIMARY KEY,
return_item_id BIGINT NOT NULL REFERENCES return_items(id) ON DELETE CASCADE,
exchange_product_id BIGINT NOT NULL REFERENCES products(id) ON DELETE RESTRICT,
exchange_variant_id BIGINT REFERENCES product_variants(id) ON DELETE RESTRICT,
quantity INT NOT NULL DEFAULT 1,
price_difference DECIMAL(10,2) DEFAULT 0.00,
is_active BOOLEAN DEFAULT TRUE,
created_by BIGINT REFERENCES users(id) ON DELETE SET NULL,
created_at TIMESTAMP DEFAULT now(),
updated_at TIMESTAMP DEFAULT now()
);


CREATE TYPE refund_type_enum AS ENUM ('full_refund', 'partial_refund', 'store_credit', 'exchange_adjustment');
CREATE TYPE refund_method_refunds_enum AS ENUM ('original_payment', 'store_credit', 'bank_transfer', 'cash', 'check');
CREATE TYPE refund_status_enum AS ENUM ('pending', 'processing', 'completed', 'failed', 'cancelled');

CREATE TABLE refunds (
id BIGSERIAL PRIMARY KEY,
refund_number VARCHAR(50) UNIQUE NOT NULL,
order_id BIGINT NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
return_id BIGINT REFERENCES returns(id) ON DELETE CASCADE,
payment_id BIGINT REFERENCES payments(id) ON DELETE SET NULL,
customer_id BIGINT NOT NULL REFERENCES users(id) ON DELETE CASCADE,

type refund_type_enum DEFAULT 'partial_refund',
method refund_method_refunds_enum NOT NULL,
status refund_status_enum DEFAULT 'pending',

refund_amount DECIMAL(10,2) NOT NULL,
processing_fee DECIMAL(10,2) DEFAULT 0.00,
net_refund_amount DECIMAL(10,2) GENERATED ALWAYS AS (refund_amount - processing_fee) STORED,

gateway_name VARCHAR(50),
gateway_transaction_id VARCHAR(255),
gateway_refund_id VARCHAR(255),
gateway_response JSON,

store_credit_amount DECIMAL(10,2),
store_credit_code VARCHAR(50),
store_credit_expiry_date DATE,

reason TEXT,
internal_notes TEXT,
customer_notification_sent BOOLEAN DEFAULT FALSE,

requested_date TIMESTAMP DEFAULT now(),
processed_date TIMESTAMP,
completed_date TIMESTAMP,

processed_by BIGINT REFERENCES users(id) ON DELETE SET NULL,
approved_by BIGINT REFERENCES users(id) ON DELETE SET NULL,

is_active BOOLEAN DEFAULT TRUE,
created_by BIGINT,
created_at TIMESTAMP WITHOUT TIME ZONE DEFAULT now(),
updated_at TIMESTAMP WITHOUT TIME ZONE DEFAULT now()
);

CREATE INDEX idx_refunds_order ON refunds(order_id);
CREATE INDEX idx_refunds_return ON refunds(return_id);
CREATE INDEX idx_refunds_customer ON refunds(customer_id);
CREATE INDEX idx_return_items_return_id ON return_items(return_id);
CREATE INDEX idx_return_items_order_item_id ON return_items(order_item_id);
CREATE INDEX idx_return_items_product_id ON return_items(product_id);
CREATE INDEX idx_return_items_variant_id ON return_items(variant_id);
CREATE INDEX idx_invoice_items_invoice ON invoice_items(invoice_id);
CREATE INDEX idx_invoice_items_product ON invoice_items(product_id);
CREATE INDEX idx_invoice_items_variant ON invoice_items(variant_id);
CREATE INDEX idx_invoices_order ON invoices(order_id);
CREATE INDEX idx_invoices_customer_email ON invoices(customer_email);
CREATE INDEX idx_invoices_number ON invoices(invoice_number);
CREATE INDEX idx_stock_product ON stock_transactions(product_id);
CREATE INDEX idx_stock_variant ON stock_transactions(variant_id);
CREATE INDEX idx_stock_reference ON stock_transactions(reference_id);