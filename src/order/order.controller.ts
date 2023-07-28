import { Controller, Post, Body } from '@nestjs/common';
import { OrderService } from './order.service';
import { Order } from './entities/order.entity';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('orders')
@Controller('orders')
export class OrderController {
  constructor(private orderService: OrderService) {}

  @Post('create')
  @ApiOperation({ summary: 'Create a new order' })
  @ApiResponse({
    status: 201,
    description: 'The order has been successfully created.',
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async createOrder(@Body() order: Order): Promise<Order> {
    return this.orderService.createOrder(order);
  }
}
