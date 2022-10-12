# Cấu trúc project

## Config

chứa config về env, job name, error, 

## Biz

Chứa toàn bộ business logic cho các endtrybpoint bao gồm model, service, 
Nếu có job thì cũng xử lý logic cho worker tại đây.

## Worker

Chứa entrypoint worker và code các job.

## API

Chứa entrypoint api, đóng vai trò như transport của service. Chứa các router khai báo vào init server. Phụ thuộc vào framework.

# Start service

required:
	* cài đặt mongo.

clone project

sử dụng yarn

run `yarn install`

tạo file `.env` và copy nội dung từ `.env.example` sang. Khai báo đầy đủ thông tin các biến.

start local `yarn dev`
